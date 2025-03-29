//
//  LoginView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct LoginView: View {
    
    @ObservedObject var viewModel: AuthenticationViewModel
    
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
                    .frame(width: 240)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(10)
                    .padding(.horizontal)
                    
            }.padding(20)
            VStack{
                Text("password:")
                    .frame(width: 260, alignment: .leading)
                TextField("password", text: $password)
                    .frame(width: 240)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(10)
                    .padding(.horizontal)
            }
            
            Button(action: {
                viewModel.login(token: "your_jwt_token_here")
            }){
                Text("Submit")
            }
            
            .frame(width: 100, height: 40)
            .background(.blue)
            .foregroundColor(.white)
            .cornerRadius(20)
            .padding(30)
            
        }
        .navigationBarBackButtonHidden(true)
        .onAppear {
            viewModel.checkAuthentication()
        }
    }
    
}

#Preview {
    LoginView(viewModel: AuthenticationViewModel())
}
