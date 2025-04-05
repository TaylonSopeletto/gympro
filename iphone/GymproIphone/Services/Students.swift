//
//  Students.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 03/04/25.
//

//
//  Days.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 30/03/25.
//

import Foundation


struct StudentsResponse: Codable, Hashable {
    let id: Int
    let full_name: String
    let picture_url: String

}



class StudentsService {
    static let shared = StudentsService()

    func get(completion: @escaping (Result<[StudentsResponse], Error>) -> Void) {
        guard let url = URL(string: "\(APIConstants.baseURL)/students/") else { return }

        
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
                    let json = try JSONDecoder().decode([StudentsResponse].self, from: data)
                    completion(.success(json))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
