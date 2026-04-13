// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTime;
import com.example.appointment.repository.BranchRepository;
import com.example.appointment.repository.BranchTimeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BranchTimeService {

    private final BranchTimeRepository repository;
    private final BranchRepository branchRepository;

    public BranchTime create(BranchTime branchTime) {
        if (branchTime.getBranch() != null) {
            Branch branch = branchRepository
                    .findById(branchTime.getBranch().getId())
                    .orElseThrow();
            branchTime.setBranch(branch);
        }
        return repository.save(branchTime);
    }

    public Optional<BranchTime> findById(Long id) {
        return repository.findById(id);
    }

    public List<BranchTime> findAll() {
        return repository.findAll();
    }

    public BranchTime update(BranchTime branchTime) {
        if (branchTime.getBranch() != null) {
            Branch branch = branchRepository
                    .findById(branchTime.getBranch().getId())
                    .orElseThrow();
            branchTime.setBranch(branch);
        }
        return repository.save(branchTime);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<BranchTime> findByBranchId(Long branchId) {
        return repository.findByBranchId(branchId);
    }

    public List<BranchTime> findByDayOfWeek(DayOfWeek dayOfWeek) {
        return repository.findByDayOfWeek(dayOfWeek);
    }

    public List<BranchTime> findByBranchIdAndDayOfWeek(Long branchId, DayOfWeek dayOfWeek) {
        return repository.findByBranchIdAndDayOfWeek(branchId, dayOfWeek);
    }
}