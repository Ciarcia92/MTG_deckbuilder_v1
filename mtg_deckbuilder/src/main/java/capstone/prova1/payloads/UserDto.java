package capstone.prova1.payloads;

import capstone.prova1.entities.User;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDto {

	
	
	public UserDto(User user) {
		this.id= user.getId();
		this.name = user.getName();
        this.username = user.getUsername();
		this.email= user.getEmail();
	}

	private Long id;
	
	private String username;
	private String name;
	

	private String email;
}
	
	