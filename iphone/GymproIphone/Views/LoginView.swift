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
    @State private var responseMessage = ""
    
    
    var body: some View {
        VStack{
            Text("Gympro")
                .font(.title2)
                .fontWeight(.bold)
                .padding(.bottom, 200)
            VStack{
                Text("username:")
                    .frame(width: 260, alignment: .leading)
                TextField("username", text: $username)
                    .frame(width: 240)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(10)
                    .padding(.horizontal)
                    .autocapitalization(.none)
                    
            }.padding(20)
            VStack{
                Text("password:")
                    .frame(width: 260, alignment: .leading)
                SecureField("password", text: $password)
                    .frame(width: 240)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(10)
                    .padding(.horizontal)
            }
            
            Text(responseMessage)
                .frame(width: 260)
                .foregroundColor(Color.red)
                .padding(.top, 20)
                .padding(.bottom, 20)
            
            Text("Forgot password?")
            
            Button(action: {
                login(username: username, password: password)
            }){
                Text("Submit")
            }
            .frame(width: 150, height: 50)
            .background(.black)
            .foregroundColor(.white)
            .cornerRadius(10)
            .padding(30)
            
        }
        .navigationBarBackButtonHidden(true)
        .onAppear {
            viewModel.checkAuthentication()
        }
    }
    func login(username: String, password: String) {
            AuthService.shared.login(username: username, password: password) { result in
                DispatchQueue.main.async {
                    switch result {
                    case .success(let token):
                        viewModel.login(token: token)
                    case .failure(let error):
                        self.responseMessage = "Error: \(error.localizedDescription)"
                    }
                }
            }
        }
}

#Preview {
    LoginView(viewModel: AuthenticationViewModel())
}
