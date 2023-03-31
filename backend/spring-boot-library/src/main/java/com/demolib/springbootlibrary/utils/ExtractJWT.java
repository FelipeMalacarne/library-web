package com.demolib.springbootlibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;


public class ExtractJWT {


    // Extract the email of logged user from the JWT token
    public static String payloadJWTExtraction(String token){
        token.replace("Bearer ", "");

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        // the second split is the JWT payload
        String payload = new String(decoder.decode(chunks[1]));

        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for(String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals("\"sub\"")) {

                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                map.put(keyValue[0], keyValue[1]);
            }
        }
        if(map.containsKey("\"sub\"")){
            return map.get("\"sub\"");
        }
        return null;
    }


}
