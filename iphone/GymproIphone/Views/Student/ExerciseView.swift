//
//  ExerciseView.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 30/03/25.
//

import SwiftUI


struct ExerciseView: View {
    
    @Environment(\.colorScheme) var colorScheme
    var exercise: Exercise
    var weekday: String
    @EnvironmentObject var timerManager: TimerManager
    @State private var showingModal = false
  
    
    init(exercise: Exercise, weekday: String) {
        self.exercise = exercise
        self.weekday = weekday
       
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                Header(title: exercise.name, subtitle: weekday)
                Spacer()
                HStack{
                    Text("Series")
                        .bold()
                        .font(.title2)
                        .padding(20)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    Spacer()
                    Image(systemName: "clock.fill")
                    Text(timerManager.formattedTime())
                        .font(.headline)
                        .padding(.trailing, 20)
                }
                ForEach(Array((exercise.series ?? []).enumerated()), id: \.element.id) { (index, series) in
                    HStack {
                        Text("Serie \(index + 1)")
                            .padding()
                        Spacer()
                        HStack{
                            Text("\(series.repetitions)")
                        }
                        Text("X")
                        HStack{
                            Text("\(series.weight) KG")
                        }
                        Spacer()
                        Button(action: {
                            showingModal = true
                           
                        }){
                            Image(systemName: "pencil")
                        }
                        .fullScreenCover(isPresented: $showingModal) {
                            ModalView(serie: series)
                        }
            
                    }
                    .padding(.trailing, 20)
                    .frame(maxWidth: .infinity, maxHeight: 70)
                    .background(AppColors.cardBackgroundColor(for: colorScheme))
                    .cornerRadius(10)
                    .padding(.horizontal)
                    .foregroundColor(AppColors.textColor(for: colorScheme))
                    
                }
                Button(action: {}){
                    Text("Stop")
                }
                .frame(width: 150, height: 50)
                .background(AppColors.actionBackgroundColor(for: colorScheme))
                .foregroundColor(AppColors.actionForengroundColor(for: colorScheme))
                .cornerRadius(10)
                .padding(30)
            }
        
        }
    }
    
}

struct ExerciseView_Previews: PreviewProvider {
    struct PreviewWrapper: View {

        var body: some View {
            ExerciseView(
                exercise: Exercise(
                    id: 1,
                    position: 1,
                    name: "Bench Press",
                    series: [
                        Series(id: 1, weight: 60, repetitions: 10),
                        Series(id: 2, weight: 70, repetitions: 8),
                        Series(id: 3, weight: 80, repetitions: 6)
                    ]
                ),
                weekday: "Monday"
            )
            .environmentObject(TimerManager())
            .environmentObject(AppState())
        }
    }

    static var previews: some View {
        PreviewWrapper()
    }
}
