package capstone.prova1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import capstone.prova1.entities.Card;
import capstone.prova1.entities.Deck;
import capstone.prova1.entities.Deck;
import capstone.prova1.repository.DeckRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DeckService {

	
	//TODO COMPLETARE IL SERVICE CON GLI ALTRI METODI DI RICERCA IN BASE ALLE ALTRE PROPRIETA
	
	@Autowired
	private DeckRepository dr;
	
	public void save(Deck c) {
		dr.save(c);
		log.info("The Deck has been saved in the Database.");
	}
	
	public Optional<Deck> getDeckById(Long id) {
		return dr.findById(id);
	}
	
	
	public List<Deck> getAllDecks(){
		return dr.findAll(PageRequest.of(0 , 2000)).getContent();
	}
	
	public Page<Deck> getAllDecks(Pageable p) {
		return dr.findAll(p);
	}
	
	public void deleteDeckById(Long id) {
		dr.deleteById(id);
	}
	
	public Deck updateDeck(Long id, Card newCard) {
	    Optional<Deck> deckToUpdate = dr.findById(id);
	    if (deckToUpdate.isPresent()) {
	        Deck deck = deckToUpdate.get();
	        deck.getCards().add(newCard);
	        return dr.save(deck);
	    } else {
	        return null;
	    }
	}
	
}