package capstone.prova1.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import capstone.prova1.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM users WHERE username = :u")
	Optional<User> findUserByUsername(@Param("u") String u);
	
	@Query(nativeQuery = true, value = "SELECT * FROM users WHERE email = :e")
	Optional<User> findUserByEmail(@Param("e") String e);
	
	@Query(nativeQuery = true, value = "SELECT u.username FROM users u JOIN decks d ON u.id = d.user_id WHERE d.name = :name")
	Optional<String> findUsernameByDeckName(@Param("name") String name);
	
	@Query(nativeQuery = true, value = "SELECT u.* FROM users u JOIN decks d ON u.id = d.user_id WHERE d.name = :deckName")
	Optional<User> findUserByDeckName(@Param("deckName") String deckName);

	Boolean existsByUsername(String u);

	Boolean existsByEmail(String e);

}
