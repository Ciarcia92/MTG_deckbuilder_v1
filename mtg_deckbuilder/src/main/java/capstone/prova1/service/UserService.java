package capstone.prova1.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import capstone.prova1.entities.User;
import capstone.prova1.payloads.UserDto;
import capstone.prova1.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

	@Autowired
	private UserRepository uR;
	
	public void save(User u) {
		uR.save(u);
		log.info("The User has been saved in the Database.");
	}
	
	public Optional<User> getUserById(Long id) {
		return uR.findById(id);
	}
	
	public Optional<UserDto> getUserDtoById(Long id) {
	    Optional<User> userOptional = uR.findById(id);
	    if (!userOptional.isPresent()) {
	        return Optional.empty();
	    }
	    User user = userOptional.get();
	    UserDto userDto = new UserDto(user);
	    return Optional.of(userDto);
	}

	public Optional<User> getUserByEmail(String e) {
		return uR.findUserByEmail(e);
	}	
	
	public List<User> getAllUsers(){
		return uR.findAll(PageRequest.of(0 , 2000)).getContent();
	}
	
	public Page<User> getAllUsers(Pageable p) {
		return uR.findAll(p);
	}
	
	public void deleteUserById(Long id) {
		uR.deleteById(id);
	}
	
	public void printList(List<User> list) {
		for (User l : list)
			log.info(l.toString());
	}

//	public User update(Long id, User user) {
//	    Optional<User> userToUpdate = uR.findById(id);
//	    if (userToUpdate.isPresent()) {
//	        User updatedUser = userToUpdate.get();
//	        updatedUser.setDecks(user.getDecks());
//	        return uR.save(updatedUser);
//	    } else {
//	        return null;
//	    }
//	}

}
