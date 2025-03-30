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
        .onAppear {
            getCurrentWeekday()
            getDays()
        }
    }
}

#Preview {
    HomeView(viewModel: AuthenticationViewModel())
}
