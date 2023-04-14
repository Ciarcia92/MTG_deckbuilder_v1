package capstone.prova1.controller;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capstone.prova1.entities.AccessDetails;
import capstone.prova1.entities.Role;
import capstone.prova1.entities.User;
import capstone.prova1.enums.RoleType;
import capstone.prova1.payloads.JwtResponse;
import capstone.prova1.payloads.LoginRequest;
import capstone.prova1.payloads.MessageResponse;
import capstone.prova1.payloads.SignupRequest;
import capstone.prova1.repository.RoleRepository;
import capstone.prova1.repository.UserRepository;
import capstone.prova1.utils.JwtUtils;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://127.0.0.1:4200")
//@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	
	@Autowired
	AuthenticationManager aM;
	@Autowired
	UserRepository uR;
	@Autowired
	RoleRepository rR;
	@Autowired
	PasswordEncoder pE;
	@Autowired
	JwtUtils jU;

	@PostMapping("/login")	
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication a = aM.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		return returnToken(a);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (uR.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (uR.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}		
		// Create new user's account
		User user = User.builder().username(signUpRequest.getUsername())
								  .email(signUpRequest.getEmail())
								  .password(pE.encode(signUpRequest.getPassword()))
								  .name(signUpRequest.getName()).build();

		Set<String> roles = signUpRequest.getRoles();
		Set<Role> r = new HashSet<>();
		if (roles == null) {
			Role x = rR.findByName(RoleType.USER).orElseThrow(() -> new RuntimeException("Error: Role wasn't found."));
			r.add(x);
		} else {
			roles.forEach(role -> {	
				RoleType roleType = EnumUtils.getEnumIgnoreCase(RoleType.class, role);
				Optional<Role> x = rR.findByName(roleType);
//				Optional<Role> x = rR.findByName(RoleType.valueOf(Character.toUpperCase(role.charAt(0)) + role.toLowerCase().substring(1)));
				if (x.isPresent()) r.add(x.get());
				else r.add(rR.findByName(RoleType.USER).get());					
			});
		}
		user.setRoles(r);
		uR.save(user);
		return returnToken(aM.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), signUpRequest.getPassword())));
	}
	
	public ResponseEntity<?> returnToken(Authentication a) {
		SecurityContextHolder.getContext().setAuthentication(a);
		String jwt = jU.generateJwtToken(a);		
		AccessDetails uD = (AccessDetails) a.getPrincipal();		
		List<String> roles = uD.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		return ResponseEntity.ok(new JwtResponse(jwt, uD.getId(), uD.getUsername(), uD.getEmail(), roles));
	}
}