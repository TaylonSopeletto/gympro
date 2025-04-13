//
//  Days.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 30/03/25.
//

import Foundation


struct DaysResponse: Codable, Hashable {
    let id: Int
    let name: String
    let weekday: String
    let student: Int
    let exercises: [Exercise]
}

class DaysService {
    static let shared = DaysService()

    func get(completion: @escaping (Result<[DaysResponse], Error>) -> Void) {
        guard let url = URL(string: "\(APIConstants.baseURL)/days/") else { return }

        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        if let token = KeychainHelper.getToken(forKey: "jwtToken") {
           request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        } else {
           completion(.failure(NSError(domain: "", code: 401, userInfo: [NSLocalizedDescriptionKey: "Token not found."])))
           return
        }

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            if let data = data {
                do {
                    let json = try JSONDecoder().decode([DaysResponse].self, from: data)
                    completion(.success(json))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
