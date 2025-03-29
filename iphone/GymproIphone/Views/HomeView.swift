//
//  HomeView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct HomeView: View {
    @ObservedObject var viewModel: AuthenticationViewModel
    
    var body: some View {
        VStack {
            Button(action: {
                viewModel.logout()
            }){
                Text("logout")
            }
            Text("Gympro")
                .bold()
                .font(.title)
                .padding(10)
            Text("Pick your exercise day").padding(20)
            HStack{
                NavigationLink(destination: ExerciseDayView()){
                    Text("Mon")
                        .frame(width: 60, height: 60)
                        .background(Color.blue)
                        .cornerRadius(50)
                        .foregroundColor(.white)
                }
                NavigationLink(destination: ExerciseDayView()){
                    Text("Tue")
                        .frame(width: 60, height: 60)
                        .background(Color.gray)
                        .cornerRadius(50)
                        .foregroundColor(.white)
                }
                NavigationLink(destination: ExerciseDayView()){
                    Text("Wed")
                        .frame(width: 60, height: 60)
                        .background(Color.gray)
                        .cornerRadius(50)
                        .foregroundColor(.white)
                }
            }
            HStack{
                NavigationLink(destination: ExerciseDayView()){
                    Text("Thu")
                        .frame(width: 60, height: 60)
                        .background(Color.gray)
                        .cornerRadius(50)
                        .foregroundColor(.white)
                }
                NavigationLink(destination: ExerciseDayView()){
                    Text("Fri")
                        .frame(width: 60, height: 60)
                        .background(Color.gray)
                        .cornerRadius(50)
                        .foregroundColor(.white)
                }
                NavigationLink(destination: ExerciseDayView()){
                    Text("Sat")
                        .frame(width: 60, height: 60)
                        .background(Color.gray)
                        .cornerRadius(50)
                        .foregroundColor(.white)
                }
            }
            
        }
        .padding()
    }
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
}
