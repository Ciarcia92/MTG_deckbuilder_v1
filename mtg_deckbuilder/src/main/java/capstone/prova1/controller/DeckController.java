package capstone.prova1.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import capstone.prova1.entities.Card;
import capstone.prova1.entities.Deck;
import capstone.prova1.entities.User;
import capstone.prova1.repository.CardRepository;
import capstone.prova1.repository.DeckRepository;
import capstone.prova1.repository.UserRepository;
import capstone.prova1.service.DeckService;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class DeckController {

	@Autowired
	private DeckRepository dr;

	@Autowired
	private DeckService ds;

	@Autowired
	private UserRepository ur;

	@Autowired
	private CardRepository cr;

	// GET USER'S DECKS
	@CrossOrigin
	@GetMapping("/decks/{userId}")
	public ResponseEntity<List<Deck>> findDeckByUser(@PathVariable Long userId) {
		List<Deck> decks = dr.findDeckByUserId(userId);
		if (!decks.isEmpty()) {
			return new ResponseEntity<>(decks, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/deck/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		Optional<Deck> deck = ds.getDeckById(id);
		if (!deck.isPresent())
			return new ResponseEntity<>("Deck not found", HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(deck.get(), HttpStatus.OK);
	}

	@CrossOrigin
	@GetMapping("/deck/id/{name}")
	public ResponseEntity<Long> findDeckIdByname(@PathVariable String name) {
		Optional<Long> decks = dr.findDeckIdByName(name);
		if (decks.isPresent()) {
			return new ResponseEntity<>(decks.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@CrossOrigin
	@GetMapping("/deck/id/{name}/{userId}")
	public ResponseEntity<Long> findDeckIdBynameAndUserId(@PathVariable String name, @PathVariable Long userId) {
		Optional<Long> deckId = dr.findDeckIdByNameAndUserId(name, userId);
		if (deckId.isPresent()) {
			return new ResponseEntity<>(deckId.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@CrossOrigin
	@GetMapping("/deck/name/{name}")
	public ResponseEntity<Deck> findDeckByDeckname(@PathVariable String name) {
		Optional<Deck> decks = dr.findDeckByName(name);
		if (decks.isPresent()) {
			return new ResponseEntity<>(decks.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// METHOD TO CREATE DECK
	@PostMapping("/decks")
//	@PreAuthorize("hasAuthority('USER')")
	public ResponseEntity<Deck> saveDataDeck(@RequestBody Deck deck) {
		User user = ur.findById(deck.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
		deck.setUser(user);
		Deck savedDeck = dr.save(deck);
		return new ResponseEntity<>(savedDeck, HttpStatus.CREATED);
	}

	// METHOD TO ADD CARDS TO DECK
	@PatchMapping("/decks/{id}")
	public ResponseEntity<Deck> addCardToDeck(@PathVariable Long id, @RequestBody Card newCard) {
		Optional<Deck> optionalDeck = dr.findById(id);
		if (optionalDeck.isPresent()) {
			Deck deck = optionalDeck.get();
			deck.getCards().add(newCard);
			dr.save(deck);
			return new ResponseEntity<>(deck, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// METHOD TO CANCEL DECK
	@DeleteMapping("deck/{id}")
	public ResponseEntity<String> deleteDeck(@PathVariable Long id) {
		Optional<Deck> deck = ds.getDeckById(id);
		if (!deck.isPresent()) {
			return ResponseEntity.notFound().build();
		} else {
			ds.deleteDeckById(deck.get().getId());
			String message = String.format("Deck with id %d cancelled!", id);
			return ResponseEntity.ok(message);
		}
	}

	// METHOD TO CANCEL CARDS FROM DECK
//	@DeleteMapping("/deck/{deckId}/card/{cardId}")
//	public ResponseEntity<Deck> removeCardFromDeck(@PathVariable Long deckId, @PathVariable Long cardId) {
//	    Optional<Deck> optionalDeck = dr.findById(deckId);
//	    if (optionalDeck.isPresent()) {
//	        Deck deck = optionalDeck.get();
//	        boolean removed = deck.getCards().removeIf(card -> card.getId().equals(cardId));
//	        if (removed) {
//	            dr.save(deck);
//	            System.out.println("Card cancelled");
//	            return new ResponseEntity<>(deck, HttpStatus.OK);
//	        } else {
//	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	        }
//	    } else {
//	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	    }
//	}
//	@DeleteMapping("/decks/{deckId}/cards/{cardId}")
//	public ResponseEntity<?> removeCardFromDeck(@PathVariable Long deckId, @PathVariable Long cardId) {
//	    Optional<Deck> optionalDeck = dr.findById(deckId);
//	    if (optionalDeck.isPresent()) {
//	        Deck deck = optionalDeck.get();
//	        List<Card> cards = deck.getCards();
//	        Optional<Card> optionalCard = cards.stream().filter(card -> card.getId().equals(cardId)).findFirst();
//	        if (optionalCard.isPresent()) {
//	            Card card = optionalCard.get();
//	            cards.remove(card);
//	            deck.setCards(cards);
//	            dr.save(deck);
//	            
//	            cr.deleteById(cardId);
//	            
//	            System.out.println("Card cancelled");
//	            return ResponseEntity.ok().build();
//	        } else {
//	            return ResponseEntity.notFound().build();
//	        }
//	    } else {
//	        return ResponseEntity.notFound().build();
//	    }
//	}

	@DeleteMapping("/decks/{deckId}/cards/{oracleId}")
	public ResponseEntity<?> removeCardFromDeck(@PathVariable Long deckId, @PathVariable String oracleId) {
		Optional<Deck> optionalDeck = dr.findById(deckId);
		if (optionalDeck.isPresent()) {
			Deck deck = optionalDeck.get();
			List<Card> cards = deck.getCards();
			Optional<Card> optionalCard = cards.stream().filter(card -> card.getOracleId().equals(oracleId))
					.findFirst();
			if (optionalCard.isPresent()) {
				Card card = optionalCard.get();
				cards.remove(card);
				deck.setCards(cards);
				dr.save(deck);

				List<Card> cardsToDelete = cr.findCardsByOracleId(oracleId);
				if (!cardsToDelete.isEmpty()) {
					Card cardToDelete = cardsToDelete.get(0);
					cr.delete(cardToDelete);
				}

				System.out.println("Card cancelled");
				return ResponseEntity.ok().build();
			} else {
				return ResponseEntity.notFound().build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
