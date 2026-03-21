// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Branch;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BranchService {
    Optional<Branch> findById (UUID id);

    Optional<Branch> findByName (String name);

    List<Branch> findAll ();
}
