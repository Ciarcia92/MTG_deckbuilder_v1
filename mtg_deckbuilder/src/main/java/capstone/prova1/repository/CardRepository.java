package capstone.prova1.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import capstone.prova1.entities.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
	
	@Query(nativeQuery = true, value = "SELECT * FROM cards WHERE deck_id = :deckId")
	List<Card> findCardsByDeckId(@Param("deckId") Long deckId);

	@Query(nativeQuery = true, value = "SELECT * FROM cards WHERE oracle_id = :oracleId")
	List<Card> findCardsByOracleId(@Param("oracleId") String oracleId);

	@Query(nativeQuery = true, value = "SELECT c.* FROM cards c JOIN decks d ON c.deck_id = d.id WHERE d.name = :deckName")
	List<Card> findCardByDeckName(@Param("deckName") String deckName);

}

//TODO COMPLETARE LE REPO CON LE QUERY PER LE ALTRE PROPRIETà