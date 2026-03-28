// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void save_entity() {
        // given
        User entity = new User(null, "Test Name", "test@example.com");

        // when
        User saved = userRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Test Name");
        assertThat(saved.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        User entity = new User(null, "Test Name", "test@example.com");
        User saved = userRepository.save(entity);

        // when
        Optional<User> found = userRepository.findById(saved.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Name");
    }

    @Test
    void findAll_returns_all_entities() {
        // given
        userRepository.save(new User(null, "Name1", "email1@example.com"));
        userRepository.save(new User(null, "Name2", "email2@example.com"));

        // when
        List<User> entities = userRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void findByEmail_returns_correct_entity() {
        // given
        userRepository.save(new User(null, "Test Name", "test@example.com"));
        userRepository.save(new User(null, "Other Name", "other@example.com"));

        // when
        Optional<User> found = userRepository.findByEmail("test@example.com");

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("test@example.com");
    }

    // Add more tests for custom methods
}