//
//  ExerciseView.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 30/03/25.
//

import SwiftUI

struct ExerciseView: View {
    
    var exercise: Exercise
    var title: String = ""
    
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 10) {
                // Displaying the title or exercise name
                Text(exercise.name)
                    .font(.title)
                    .fontWeight(.bold)
                    .padding(.top)
                
                // Displaying series information
                ForEach(exercise.series, id: \.id) { series in
                    HStack {
                        Text("Set \(series.id)")
                        Spacer()
                        Text("Weight: \(series.weight) kg")
                        Spacer()
                        Text("Reps: \(series.repetitions)")
                    }
                    .padding()
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(8)
                }
                
                Spacer()
            }
            .padding()

        }
    }
    
}

#Preview {
    ExerciseView(exercise: Exercise(
        id: 1,
        position: 1,
        name: "Bench Press",
        series: [
            Series(id: 1, weight: 60, repetitions: 10),
            Series(id: 2, weight: 70, repetitions: 8),
            Series(id: 3, weight: 80, repetitions: 6)
        ]
    ))
}
