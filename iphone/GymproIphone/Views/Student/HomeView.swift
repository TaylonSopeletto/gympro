//
//  HomeView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct HomeView: View {
    @ObservedObject var viewModel: AuthenticationViewModel
    @Environment(\.colorScheme) var colorScheme
    let days = ["sunday", "monday", "tuesday", "wednesday", "thurday", "friday", "saturday"]
    @State private var currentWeekday = ""
    @State private var responseMessage = ""
    @State private var responseDays : [DaysResponse] = []
    @State private var dayIndex = 0
    @State private var navigateToExercises = false
    @EnvironmentObject var timerManager: TimerManager
    
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
                    
                case .failure(let error):
                    self.responseMessage = "Error: \(error.localizedDescription)"
                }
            }
        }
    }
    
    
    var body: some View {
        NavigationStack() {
            VStack {
                Header(title: "Home", subtitle: "")
                Spacer()
                Text("Weekday")
                    .padding(20)
                
                VStack {
                   ForEach(0..<3) { row in
                       HStack {
                           ForEach(days[row * 3..<min(row * 3 + 3, days.count)], id: \.self) { day in
                               Button(action: {}) {
                                   Text(day.prefix(3).capitalized)
                                       .frame(width: 80, height: 80)
                                       .background(AppColors.cardBackgroundColor(for: colorScheme))
                                       .cornerRadius(20)
                                       .foregroundColor(AppColors.textColor(for: colorScheme))
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
                            .foregroundColor(AppColors.textColor(for: colorScheme))
                    }
                    .frame(width: 10, height: 20)
                    .padding(20)
                    .background(AppColors.cardBackgroundColor(for: colorScheme))
                    .cornerRadius(20)
                    
                    if responseDays.indices.contains(dayIndex) {
                        Text(responseDays[dayIndex].name)
                            .frame(width: 180, height: 20)
                            .padding(20)
                            .background(AppColors.cardBackgroundColor(for: colorScheme))
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
                            .foregroundColor(AppColors.textColor(for: colorScheme))
                        
                    }
                    .frame(width: 10, height: 20)
                    .padding(20)
                    .background(AppColors.cardBackgroundColor(for: colorScheme))
                    .cornerRadius(20)
                    
                }
                
                
                VStack {
                    Button(action: {
                        navigateToExercises = true
                        timerManager.start()
                    }) {
                        Text("Workout")
                    }
                    .frame(width: 150, height: 50)
                    .background(AppColors.actionBackgroundColor(for: colorScheme))
                    .foregroundColor(AppColors.actionForengroundColor(for: colorScheme))
                    .cornerRadius(10)
                    .padding(30)
                    .navigationDestination(isPresented: $navigateToExercises) {
                        if responseDays.indices.contains(dayIndex) {
                            ExercisesListView(title: responseDays[dayIndex].name, exercises: responseDays[dayIndex].exercises, weekday: responseDays[dayIndex].weekday)
                        } else {
                           Text("Invalid day index")
                       }
                    }
                }
                
                
            }
            .padding()
            .navigationBarBackButtonHidden(true)
            .onAppear {
                getCurrentWeekday()
                getDays()
            }
        }
        
    }
        
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
        .environmentObject(TimerManager())
}
