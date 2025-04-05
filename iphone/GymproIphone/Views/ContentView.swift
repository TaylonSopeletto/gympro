//
//  ContentView.swift
//  GymproIphone
//
//  Created by taylon on 21/09/24.
//

import SwiftUI

struct ContentView: View {
    
    @StateObject var timerManager = TimerManager()
    @StateObject var viewModel = AuthenticationViewModel()
    @State private var path = NavigationPath()
    

    var body: some View {
        NavigationStack(path: $path){
            if viewModel.getRole() == "student" {
                HomeView(viewModel: viewModel)
                    .transition(.scale)
                  
               
            } else {
                if viewModel.getRole() == "teacher" {
                    TeacherView()
                }else{
                    LoginView(viewModel: viewModel)
                        .transition(.scale)
                }
               
            }
        }
        .environmentObject(timerManager)
        .onAppear {
            viewModel.checkAuthentication()
        }
        .onChange(of: viewModel.getRole()) {
            path = NavigationPath()
        }
    }
}

#Preview {
    ContentView().environmentObject(TimerManager())
}
