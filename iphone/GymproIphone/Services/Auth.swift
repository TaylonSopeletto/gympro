//
//  Auth.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 29/03/25.
//

import Foundation


struct LoginResponse: Codable {
    let access: String
}


class AuthService {
    static let shared = AuthService()

    func login(username: String, password: String, completion: @escaping (Result<String, Error>) -> Void) {
        guard let url = URL(string: "\(APIConstants.baseURL)/token/") else { return }

        let body: [String: Any] = ["username": username, "password": password]
        let jsonData = try? JSONSerialization.data(withJSONObject: body)

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = jsonData

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            if let data = data {
                do {
                    let json = try JSONDecoder().decode(LoginResponse.self, from: data)
                    completion(.success(json.access))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
