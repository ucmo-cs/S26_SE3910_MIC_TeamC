// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.Branch;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class BranchRepositoryTest {

    @Autowired
    private BranchRepository branchRepository;

    @Test
    void save_entity() {
        // given
        Branch entity = createBranch("Test Name", "123 Test Street");

        // when
        Branch saved = branchRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Test Name");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        Branch entity = createBranch("Test Name", "123 Test Street");
        Branch saved = branchRepository.save(entity);

        // when
        Optional<Branch> found = branchRepository.findById(saved.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Name");
    }

    @Test
    void findAll_returns_all_entities() {
        // given
        branchRepository.save(createBranch("Name1", "Address 1"));
        branchRepository.save(createBranch("Name2", "Address 2"));

        // when
        List<Branch> entities = branchRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void findByName_returns_matching_entities() {
        // given
        branchRepository.save(createBranch("Test Name", "Address 1"));
        branchRepository.save(createBranch("Other Name", "Address 2"));

        // when
        List<Branch> found = branchRepository.findByName("Test Name");

        // then
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getName()).isEqualTo("Test Name");
    }

    // Add more tests for custom methods

    private Branch createBranch(String name, String address) {
        Branch branch = new Branch();
        branch.setName(name);
        branch.setAddress(address);
        return branch;
    }
}