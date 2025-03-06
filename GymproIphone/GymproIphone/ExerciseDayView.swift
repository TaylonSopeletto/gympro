//
//  ExerciseDayView.swift
//  GymproIphone
//
//  Created by taylon on 23/09/24.
//

import SwiftUI

struct ExerciseDayView: View {
    var body: some View {
        VStack{
            Text("Legs")
                .bold()
                .padding(10)
                .font(.title2)
            Text("00:34:03")
                .font(.title)
                .padding(10)
            VStack{
                NavigationLink(destination: ExercisesListView()){
                    Text("Start it now")
                        .frame(width: 140, height: 40)
                        .background(Color.blue)
                        .foregroundColor(Color.white)
                        .cornerRadius(30)
                }
            }
            .padding(10)
            
        }
    }
}

#Preview {
    ExerciseDayView()
}
