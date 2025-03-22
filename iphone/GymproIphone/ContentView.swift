//
//  ContentView.swift
//  GymproIphone
//
//  Created by taylon on 21/09/24.
//

import SwiftUI

struct ContentView: View {
    
    @State private var isLoggedIn = false
    @State private var exerciseRuning = false
    

    var body: some View {
        NavigationStack{
            if isLoggedIn {
                HomeView()
                    .transition(.scale)
            } else {
                LoginView(isLoggedIn: $isLoggedIn)
                    .transition(.scale)
            }
        }.animation(.easeInOut, value: isLoggedIn)
    }
}

#Preview {
    ContentView()
}
