// Licensed under the MIT License
package com.example.appointment.exception;

/**
 * Thrown when a requested timeslot is no longer available.
 */
public class TimeslotUnavailableException extends RuntimeException {
    public TimeslotUnavailableException (String message) {
        super(message);
    }
}
