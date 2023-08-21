package org.railway;

import java.security.SecureRandom;

public class CrappyUUID {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int UUID_LENGTH = 8;

    public static String generate () {
        StringBuilder uuidBuilder = new StringBuilder(UUID_LENGTH);
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < UUID_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            uuidBuilder.append(randomChar);
        }

        return uuidBuilder.toString();
    }
}