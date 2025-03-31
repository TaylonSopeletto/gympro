//
//  HomeView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct HomeView: View {
    let days = ["sunday", "monday", "tuesday", "wednesday", "thurday", "friday", "saturday"]
    @State private var currentWeekday = ""
    
    @ObservedObject var viewModel: AuthenticationViewModel
    @State private var responseMessage = ""
    @State private var responseDays : [DaysResponse] = []
    @State private var dayIndex = 0
    
    @State private var navigateToExercises = false
    
    func getCurrentWeekday() {
        let date = Date()
        let calendar = Calendar.current
        let weekdayIndex = calendar.component(.weekday, from: date) - 1
        currentWeekday = days[weekdayIndex]
    }
    
    func getDays() {
        DaysService.shared.get() { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let days):
                    responseDays = days
                    print(days)
                case .failure(let error):
                    self.responseMessage = "Error: \(error.localizedDescription)"
                }
            }
        }
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                Button(action: {viewModel.logout()}){
                    Text("logout")
                }
                Text("Weekday").padding(20)
                
                VStack {
                    ForEach(0..<3) { row in
                        HStack {
                            ForEach(days[row * 3..<min(row * 3 + 3, days.count)], id: \.self) { day in
                                Button(action: {}) {
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
                    Button(action: {
                        if(responseDays.count - 1 <= dayIndex){
                            dayIndex = dayIndex - 1
                        }
                    }){
                        Image(systemName: "arrow.left")
                            .foregroundColor(responseDays.count - 1 <= dayIndex ? Color.black: Color.gray.opacity(0.4))
                    }
                    .frame(width: 10, height: 20)
                    .padding(20)
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(20)
                    
                    if responseDays.indices.contains(dayIndex) {
                        Text(responseDays[dayIndex].name)
                            .frame(width: 180, height: 20)
                            .padding(20)
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(20)
                    } else {
                        Text("No Data")
                            .frame(width: 80, height: 20)
                            .padding(20)
                            .background(Color.red.opacity(0.1))
                            .cornerRadius(20)
                    }
                    
                    Button(action: {
                        if(responseDays.count - 1 > dayIndex){
                            dayIndex = dayIndex + 1
                        }
                    }){
                        Image(systemName: "arrow.right")
                            .foregroundColor(responseDays.count - 1 > dayIndex ? Color.black: Color.gray.opacity(0.4))
                        
                    }
                    .frame(width: 10, height: 20)
                    .padding(20)
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(20)
                    
                }
                
                
                VStack {
                    Button(action: {
                        navigateToExercises = true
                    }) {
                        Text("Workout")
                    }
                    .frame(width: 150, height: 50)
                    .background(.black)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .padding(30)
                    .navigationDestination(isPresented: $navigateToExercises) {
                        if responseDays.indices.contains(dayIndex) {
                            ExercisesListView(title: responseDays[dayIndex].name, exercises: responseDays[dayIndex].exercises)
                        } else {
                           Text("Invalid day index")
                       }
                    }
                }
                
                
            }
            .padding()
            .onAppear {
                getCurrentWeekday()
                getDays()
            }
        }
    }
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
}
