//
//  HomeView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct Day: Identifiable {
    let id: String
    let label: String
}

struct HomeView: View {
    @ObservedObject var viewModel: AuthenticationViewModel
    @Environment(\.colorScheme) var colorScheme
    let days: [Day] = [
        Day(id: "sun", label: "s"),
        Day(id: "mon", label: "m"),
        Day(id: "tue", label: "t"),
        Day(id: "wed", label: "w"),
        Day(id: "thu", label: "t"),
        Day(id: "fri", label: "f"),
        Day(id: "sat", label: "s")
    ]
    @State private var currentWeekday = ""
    @State private var responseMessage = ""
    @State private var responseDays : [DaysResponse] = []
    @State private var dayIndex = 0
    @State private var navigateToExercises = false
    @EnvironmentObject var timerManager: TimerManager
    
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
                Text("April's Second Week")
                    .fontWeight(.bold)
                    .padding(20)
                
                VStack {
                    ForEach(0..<1) { _ in
                        HStack {
                            ForEach(days, id: \.id) { day in
                                Button(action: {}) {
                                    Text(day.label.capitalized)
                                        .font(.caption)
                                        .frame(width: 40, height: 40)
                                        .background(AppColors.cardBackgroundColor(for: colorScheme))
                                        .cornerRadius(10)
                                        .foregroundColor(AppColors.textColor(for: colorScheme))
                                }
                            }
                        }
                    }
                }
                Spacer()
                
                NavigationLink(destination: AIView()){
                    VStack{
                        Image(systemName: "apple.intelligence")
                            .font(.title)
                            .foregroundColor(AppColors.textColor(for: colorScheme))
                            .padding(.bottom, 4)
                        Text("Equipment Classifier")
                            .foregroundColor(AppColors.textColor(for: colorScheme))
                    }

                        
                }
                Spacer()
                
                Text("Exercise")
                    .fontWeight(.bold)
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
                            ExercisesListView(title: responseDays[dayIndex].name, weekday: responseDays[dayIndex].weekday, exercises: responseDays[dayIndex].exercises)
                        } else {
                           Text("Invalid day index")
                       }
                    }
                }
                
                
            }
            .padding()
            .navigationBarBackButtonHidden(true)
            .onAppear {
                getDays()
            }
        }
        
    }
        
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
        .environmentObject(TimerManager())
        .environmentObject(AppState())
}
