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
        Topic entity = createTopic("Test Name", "Test Description", 1);

        // when
        Topic saved = topicRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Test Name");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        Topic entity = createTopic("Test Name", "Test Description", 1);
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
        topicRepository.save(createTopic("Name1", "Description 1", 1));
        topicRepository.save(createTopic("Name2", "Description 2", 2));

        // when
        List<Topic> entities = topicRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void findByName_returns_matching_entities() {
        // given
        topicRepository.save(createTopic("Test Name", "Description 1", 1));
        topicRepository.save(createTopic("Other Name", "Description 2", 2));

        // when
        List<Topic> found = topicRepository.findByName("Test Name");

        // then
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getName()).isEqualTo("Test Name");
    }

    // Add more tests for custom methods

    private Topic createTopic(String name, String description, int icon) {
        Topic topic = new Topic();
        topic.setName(name);
        topic.setDescription(description);
        topic.setIcon(icon);
        return topic;
    }
}