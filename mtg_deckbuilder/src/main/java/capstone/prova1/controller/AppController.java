package capstone.prova1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
//@CrossOrigin("http://localhost:4200/")
public class AppController {

	@GetMapping("/index")
	public String index() {
		return "index";
	}
}