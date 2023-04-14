package capstone.prova1.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import capstone.prova1.entities.Card;
import capstone.prova1.entities.Deck;
import capstone.prova1.entities.User;
import capstone.prova1.repository.CardRepository;
import capstone.prova1.repository.DeckRepository;
import capstone.prova1.repository.UserRepository;
import capstone.prova1.service.CardService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "http://localhost:50017")
//@CrossOrigin(origins = "http://127.0.0.1:5501")
public class CardController {

	@Autowired
	private CardRepository cr;

	@Autowired
	private CardService cs;

	@Autowired
	private UserRepository ur;
	
	@Autowired
	private DeckRepository dr;
	





	//GET THE CARDS OF A SPECIFIC DECK
	@GetMapping("/cards/deck/{deckId}")
	public ResponseEntity<List<Card>> findCardsByDeckId(@PathVariable Long deckId) {
	    List<Card> cards = cr.findCardsByDeckId(deckId);
	    if (cards.isEmpty()) {
	    	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    } else {
	    	return new ResponseEntity<>(cards, HttpStatus.OK);
	    }
	}



	//	GET DECK'S CARDS BASED ON THE DECKNAME
	@CrossOrigin
	@GetMapping("/cards_deck/{deckName}")
	public ResponseEntity<List<Card>> findCardByDeckName(@PathVariable String deckName) {
	    List<Card> cards = cr.findCardByDeckName(deckName);
	    if (cards.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    } else {
	        return new ResponseEntity<>(cards, HttpStatus.OK);
	    }
	}

	
	@GetMapping("/cards")
	public ResponseEntity<List<Card>> getAllCards(){
		List<Card> cards = cs.getAllCards();
		if (!cards.isEmpty()) {
	        return new ResponseEntity<>(cards, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	//GET CARD BY ORACLE ID
	@GetMapping("/cards/oracleId/{oracle_id}")
	public ResponseEntity<List<Card>> getCardByUri(@PathVariable String oracle_id){
		List<Card> cards = cr.findCardsByOracleId(oracle_id);
		if (!cards.isEmpty()) {
			return new ResponseEntity<>(cards, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/card/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		Optional<Card> card = cs.getCardById(id);
		if (!card.isPresent()) return new ResponseEntity<>("Card not found",HttpStatus.NOT_FOUND);		 
		return new ResponseEntity<>(card.get(), HttpStatus.OK);
	}

	@PostMapping("/cards")
	public Card saveDataCard(@RequestBody Card card) {
//	    Deck deck = dr.findById(card.getDeck().getId())
//	                  .orElseThrow(() -> new RuntimeException("Deck not found"));
	    Card c = new Card();
	    c.setUri(card.getUri());
//	    c.setName(card.getName());
//	    c.setManaCost(card.getManaCost());
//	    c.setTypeLine(card.getTypeLine());
//	    c.setSetName(card.getSetName());
	    c.setImageUris(card.getImageUris());
//	    c.setEurPrice(card.getEurPrice());
//	    c.setDeckId(card.getDeckId());
//	    c.setDeck(deck);
	    return cr.save(c);
	}

	@DeleteMapping("card/{id}")
	public ResponseEntity<String> deleteCard(@PathVariable Long id) {
	    Optional<Card> card = cs.getCardById(id);
	    if (!card.isPresent()) {
	        return ResponseEntity.notFound().build();
	    } else {
	        cs.deleteCardById(card.get().getId());
	        String message = String.format("Card with id %d cancelled!", id);
	        return ResponseEntity.ok(message);
	    }
	}
}