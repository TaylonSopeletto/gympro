//
//  LoginView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct LoginView: View {
    
    @Binding var isLoggedIn: Bool
    
    @State private var username: String = ""
    @State private var password: String = ""
    
    
    var body: some View {
        VStack{
            Text("Login")
                .font(.title)
                .padding(30)
            VStack{
                Text("username:")
                    .frame(width: 260, alignment: .leading)
                TextField("username", text: $username)
                    .frame(width: 240, height: 40)
                    .padding(10)
                    .border(Color.gray)
            }.padding(20)
            VStack{
                Text("password:")
                    .frame(width: 260, alignment: .leading)
                TextField("username", text: $password)
                    .frame(width: 240, height: 40)
                    .padding(10)
                    .border(Color.gray)
            }
            
            Button(action: {
                isLoggedIn = true
            }){
                Text("Submit")
            }
            .frame(width: 100, height: 40)
            .background(.blue)
            .foregroundColor(.white)
            .cornerRadius(20)
            .padding(30)
        }
    }
}

#Preview {
    LoginView(isLoggedIn: .constant(true))
}
