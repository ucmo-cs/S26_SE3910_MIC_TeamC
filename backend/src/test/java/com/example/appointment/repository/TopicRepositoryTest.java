// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.Topic;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TopicRepositoryTest {

    @Autowired
    private TopicRepository topicRepository;

    @Test
    void save_entity() {
        // given
        Topic entity = new Topic(null, "Test Name");

        // when
        Topic saved = topicRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Test Name");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        Topic entity = new Topic(null, "Test Name");
        Topic saved = topicRepository.save(entity);

        // when
        Optional<Topic> found = topicRepository.findById(saved.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Name");
    }

    @Test
    void findAll_returns_all_entities() {
        // given
        topicRepository.save(new Topic(null, "Name1"));
        topicRepository.save(new Topic(null, "Name2"));

        // when
        List<Topic> entities = topicRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void findByName_returns_matching_entities() {
        // given
        topicRepository.save(new Topic(null, "Test Name"));
        topicRepository.save(new Topic(null, "Other Name"));

        // when
        List<Topic> found = topicRepository.findByName("Test Name");

        // then
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getName()).isEqualTo("Test Name");
    }

    // Add more tests for custom methods
}