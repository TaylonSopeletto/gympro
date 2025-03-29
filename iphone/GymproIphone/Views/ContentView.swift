//
//  ContentView.swift
//  GymproIphone
//
//  Created by taylon on 21/09/24.
//

import SwiftUI

struct ContentView: View {
    
    @StateObject var viewModel = AuthenticationViewModel()
    @State private var exerciseRuning = false
    

    var body: some View {
        
        NavigationStack{
            if viewModel.isAuthenticated {
                HomeView(viewModel: viewModel)
                    .transition(.scale)
            } else {
                LoginView(viewModel: viewModel)
                    .transition(.scale)
            }
        } .onAppear {
            viewModel.checkAuthentication()
        }
       
    }
}

#Preview {
    ContentView()
}
