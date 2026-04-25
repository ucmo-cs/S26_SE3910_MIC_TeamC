// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class BranchTopicRepositoryTest {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private BranchTopicRepository branchTopicRepository;

    @Test
    void save_entity() {
        // given
        Branch branch = branchRepository.save(createBranch("Test Branch", "123 Test Street"));
        Topic topic = topicRepository.save(createTopic("Test Topic", "Test Description", 1));
        BranchTopic entity = new BranchTopic(null, branch, topic);

        // when
        BranchTopic saved = branchTopicRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getBranch().getName()).isEqualTo("Test Branch");
        assertThat(saved.getTopic().getName()).isEqualTo("Test Topic");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        Branch branch = branchRepository.save(createBranch("Test Branch", "123 Test Street"));
        Topic topic = topicRepository.save(createTopic("Test Topic", "Test Description", 1));
        BranchTopic entity = new BranchTopic(null, branch, topic);
        BranchTopic saved = branchTopicRepository.save(entity);

        // when
        Optional<BranchTopic> found = branchTopicRepository.findById(saved.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getBranch().getName()).isEqualTo("Test Branch");
    }

    @Test
    void findAll_returns_all_entities() {
        // given
        Branch branch = branchRepository.save(createBranch("Test Branch", "123 Test Street"));
        Topic topic = topicRepository.save(createTopic("Test Topic", "Test Description", 1));
        branchTopicRepository.save(new BranchTopic(null, branch, topic));
        branchTopicRepository.save(new BranchTopic(null, branch, topic));

        // when
        List<BranchTopic> entities = branchTopicRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void findByBranchId_returns_matching_entities() {
        // given
        Branch branch1 = branchRepository.save(createBranch("Branch1", "Address 1"));
        Branch branch2 = branchRepository.save(createBranch("Branch2", "Address 2"));
        Topic topic = topicRepository.save(createTopic("Test Topic", "Test Description", 1));
        branchTopicRepository.save(new BranchTopic(null, branch1, topic));
        branchTopicRepository.save(new BranchTopic(null, branch2, topic));

        // when
        List<BranchTopic> found = branchTopicRepository.findByBranchId(branch1.getId());

        // then
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getBranch().getId()).isEqualTo(branch1.getId());
    }

    @Test
    void findByTopicId_returns_matching_entities() {
        // given
        Branch branch = branchRepository.save(createBranch("Test Branch", "123 Test Street"));
        Topic topic1 = topicRepository.save(createTopic("Topic1", "Description 1", 1));
        Topic topic2 = topicRepository.save(createTopic("Topic2", "Description 2", 2));
        branchTopicRepository.save(new BranchTopic(null, branch, topic1));
        branchTopicRepository.save(new BranchTopic(null, branch, topic2));

        // when
        List<BranchTopic> found = branchTopicRepository.findByTopicId(topic1.getId());

        // then
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getTopic().getId()).isEqualTo(topic1.getId());
    }

    // Add more tests for custom methods

    private Branch createBranch(String name, String address) {
        Branch branch = new Branch();
        branch.setName(name);
        branch.setAddress(address);
        return branch;
    }

    private Topic createTopic(String name, String description, int icon) {
        Topic topic = new Topic();
        topic.setName(name);
        topic.setDescription(description);
        topic.setIcon(icon);
        return topic;
    }
}