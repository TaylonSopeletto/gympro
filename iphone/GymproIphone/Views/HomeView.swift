//
//  HomeView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct HomeView: View {
    @ObservedObject var viewModel: AuthenticationViewModel
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    
    var body: some View {
        VStack {
            Text("Hello, [name]!")
                .bold()
                .font(.title)
                .padding(10)
            
            Text("Weekday").padding(20)
            
            VStack {
                ForEach(0..<2) { row in
                    HStack {
                        ForEach(days[row * 3..<min(row * 3 + 3, days.count)], id: \.self) { day in
                            NavigationLink(destination: ExerciseDayView()) {
                                Text(day)
                                    .frame(width: 80, height: 80)
                                    .background(day == "Mon" ? Color.black : Color.gray.opacity(0.1))
                                    .cornerRadius(20)
                                    .foregroundColor(day == "Mon" ? Color.white : Color.black)
                                    
                            }
                        }
                    }
                }
            }
            
            Text("Exercise").padding(20)
            HStack {
                Button(action: {}){
                    Text("<")
                }
                Text("Legs").padding(20)
                Button(action: {}){
                    Text(">")
                }
                
            }
                       
        }
        .padding()
    }
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
}
