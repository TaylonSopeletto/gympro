//
//  HomeView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct HomeView: View {
    @ObservedObject var viewModel: AuthenticationViewModel
    let days = ["monday", "tuesday", "wednesday", "thurday", "friday", "saturday", "sunday"]
    @State private var currentWeekday = ""
    
    var body: some View {
        VStack {
            Text("Weekday").padding(20)
            
            VStack {
                ForEach(0..<3) { row in
                    HStack {
                        ForEach(days[row * 3..<min(row * 3 + 3, days.count)], id: \.self) { day in
                            Button(action: {
                                currentWeekday = day
                            }) {
                                Text(day.prefix(3).capitalized)
                                    .frame(width: 80, height: 80)
                                    .background(day == currentWeekday ? Color.black : Color.gray.opacity(0.1))
                                    .cornerRadius(20)
                                    .foregroundColor(day == currentWeekday ? Color.white : Color.black)
                                    
                            }
                        }
                    }
                }
            }
            
            Text("Exercise")
                .padding(20)
                
            
            HStack {
                Button(action: {}){
                    Image(systemName: "arrow.left")
                        .foregroundColor(Color.black)
                }
                .frame(width: 30, height: 20)
                .padding(20)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(20)
                
                Text("Legs")
                    .frame(width: 80, height: 20)
                    .padding(20)
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(20)
                
                Button(action: {}){
                    Image(systemName: "arrow.right")
                        .foregroundColor(Color.black)
                    
                }
                .frame(width: 30, height: 20)
                .padding(20)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(20)
            }
            
            Button(action: {}){
                Text("Workout")
            }
            .frame(width: 150, height: 50)
            .background(.black)
            .foregroundColor(.white)
            .cornerRadius(10)
            .padding(30)
                       
        }
        .padding()
    }
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
}
