//
//  AuthenticationViewModel.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 28/03/25.
//

import SwiftUI
import Combine

class AuthenticationViewModel: ObservableObject {
    @Published var isAuthenticated: Bool = false
    
    func login(token: String) {
        let success = KeychainHelper.saveToken(token: token, forKey: "jwtToken")
        isAuthenticated = success
    }
    
    func logout() {
        let success = KeychainHelper.deleteToken(forKey: "jwtToken")
        isAuthenticated = !success
    }
    
    func checkAuthentication() {
        if let token = KeychainHelper.getToken(forKey: "jwtToken") {
            isAuthenticated = true
        } else {
            isAuthenticated = false
        }
    }
    
    func getRole() -> String?{
        if let token = KeychainHelper.getToken(forKey: "jwtToken"){
            let decoded = JWTDecoder.decode(jwtToken: token)
            if(decoded?.is_student == true){
                return "student"
            }
            if(decoded?.is_teacher == true){
                return "teacher"
            }
        }
        return "no_role"
    }
    
    func decodeToken() -> JWTPayload? {
        if let token = KeychainHelper.getToken(forKey: "jwtToken"){
            let decoded = JWTDecoder.decode(jwtToken: token)
            return decoded
        }
        return nil
    }
}
