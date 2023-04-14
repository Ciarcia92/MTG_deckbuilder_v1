package capstone.prova1.service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import capstone.prova1.entities.Card;
import capstone.prova1.repository.CardRepository;
import capstone.prova1.entities.Card;

@Slf4j
@Service
public class CardService {

	
	//TODO COMPLETARE IL SERVICE CON GLI ALTRI METODI DI RICERCA IN BASE ALLE ALTRE PROPRIETA
	@Autowired
	private CardRepository cr;
	
	public void save(Card c) {
		cr.save(c);
		log.info("The Card has been saved in the Database.");
	}
	
	public Optional<Card> getCardById(Long id) {
		return cr.findById(id);
	}
	
	
	public List<Card> getAllCards(){
		return cr.findAll(PageRequest.of(0 , 2000)).getContent();
	}
	
	public Page<Card> getAllCards(Pageable p) {
		return cr.findAll(p);
	}
	
	public void deleteCardById(Long id) {
		cr.deleteById(id);
	}
	
	
}
