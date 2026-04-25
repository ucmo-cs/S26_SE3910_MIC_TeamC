// Licensed under the MIT License
package com.example.appointment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;

import java.util.Arrays;

/**
 * Spring Security configuration for session-based authentication.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * PasswordEncoder bean for BCrypt hashing.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * UserDetailsService bean for loading users from database.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

            // Return a Spring Security User with username, password, and no roles
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .authorities("ROLE_USER")
                    .build();
        };
    }

    /**
     * DaoAuthenticationProvider bean for authenticating users.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * SecurityFilterChain bean for configuring HTTP security.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Disable CSRF for simplicity (enable in production with tokens)
                .csrf(csrf -> csrf.disable())
                // Configure session management
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .invalidSessionUrl("/api/auth/login"))
                // Configure authorization
                .authorizeHttpRequests(authz -> authz
                        // Public endpoints
                    .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/logout", "/api/auth/me")
                    .permitAll()
                        .requestMatchers("/api/branches", "/api/branches/**").permitAll()
                        .requestMatchers("/api/topics", "/api/topics/**").permitAll()
                        .requestMatchers("/api/branchtopics", "/api/branchtopics/**").permitAll()
                        .requestMatchers("/api/branchtimes", "/api/branchtimes/**").permitAll()
                        .requestMatchers("/api/users", "/api/users/**").permitAll()
                        .requestMatchers("/h2-console", "/h2-console/**").permitAll()
                    // Public appointment endpoints
                        .requestMatchers("/api/appointments/taken-slots").permitAll()
                    // Protected endpoints
                        .requestMatchers("/api/appointments", "/api/appointments/**").authenticated()
                        // All other requests require authentication
                        .anyRequest().authenticated())
                // Configure login/logout
                .httpBasic(httpBasic -> httpBasic.disable())  // Disable Basic auth for public endpoints
                .logout(logout -> logout
                    // Keep Spring Security logout on a separate path so AuthController
                    // can own /api/auth/logout and return the API response payload.
                    .logoutUrl("/api/auth/security-logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true));

        // Allow H2 console frames
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }

    /**
     * CORS configuration source.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
