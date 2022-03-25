package iset.pfe.example.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.BoundConfigurationProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Chef;
import iset.pfe.example.entities.Role;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.ChefRepository;
import iset.pfe.example.repositories.RoleRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService implements UserDetailsService {
	private final ChefRepository userRepository;
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	public UserService(ChefRepository userRepository) {
	this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	Objects.requireNonNull(username);
	Chef user = userRepository.findUserWithName(username)
	.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	Collection<GrantedAuthority> authorities=new ArrayList<>();
	user.getRoles().forEach(r->{
	 authorities.add(new SimpleGrantedAuthority(r.getName()));
	});
	return new
	org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
	}
	
	
	
	public Chef saveUser(String username, String password, String confirmedPassword) {
			Chef appUser = new Chef();
		 if (userRepository.findUserWithName(username).isPresent() == true)
		 throw new RuntimeException("User already exists");
		 
		 if (!password.equals(confirmedPassword))
		 throw new RuntimeException("Please confirm your password");
		 
		 appUser.setUsername(username);
		 Set<Role> roles = new HashSet<Role>();
		 Role r = new Role("ROLE_USER");
		 roleRepository.save(r);
		 roles.add(r);
		 appUser.setRoles(roles);
		 appUser.setPassword(bCryptPasswordEncoder.encode(password));
		 userRepository.save(appUser);
		 return appUser;
		 }
	
}
