//
//  JwtDecoder.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 03/04/25.
//

import Foundation

struct JWTPayload: Codable {
    let username: String
    let is_student: Bool
    let is_teacher: Bool
    let user_id: Int?
    let exp: Int
}

class JWTDecoder {
    static func decode(jwtToken: String) -> JWTPayload? {
        let segments = jwtToken.components(separatedBy: ".")
        guard segments.count > 1 else { return nil }

        let payloadSegment = segments[1]
        var base64String = payloadSegment
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")

        // Pad base64 string with '='
        while base64String.count % 4 != 0 {
            base64String += "="
        }

        guard let payloadData = Data(base64Encoded: base64String) else { return nil }

        let decoder = JSONDecoder()
        do {
            let payload = try decoder.decode(JWTPayload.self, from: payloadData)
            return payload
        } catch {
            print("Failed to decode JWT payload: \(error)")
            return nil
        }
    }
}
