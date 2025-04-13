import SwiftUI

struct ExercisesListView: View {
    @Environment(\.colorScheme) var colorScheme
    var title : String
    var weekday : String
    @State var exercises : [Exercise] = []
    @EnvironmentObject var timerManager: TimerManager
    @EnvironmentObject var appState: AppState
    
    
    var body: some View {
        NavigationStack {
            VStack {
                Header(title: title, subtitle: weekday)
                Spacer()
                HStack{
                    Text("Exercises")
                        .bold()
                        .font(.title2)
                        .padding(20)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    Spacer()
                    Image(systemName: "clock.fill")
                    Text(timerManager.formattedTime())
                        .font(.headline)
                        .padding(.trailing, 20)
                }.onAppear(){
                    appState.exercises = exercises
                }
                
                VStack {
                    ForEach(appState.exercises, id: \.name) { exercise in
                           NavigationLink(destination: ExerciseView(exercise: exercise, weekday: weekday)) {
                               HStack {
                                   Text(exercise.name.capitalized)
                                       .padding()
                                   Spacer()
                                   Button(action: {
                                       appState.exercises = []
                                   }){
                                       Image(systemName: "checkmark.circle")
                                           .font(.title)
                                           .padding(.trailing, 20)
                                           .foregroundColor(.gray)
                                   }
                                   
                               }
                               .frame(maxWidth: .infinity, maxHeight: 70)
                               .background(AppColors.cardBackgroundColor(for: colorScheme))
                               .cornerRadius(10)
                               .padding(.horizontal)
                               .foregroundColor(AppColors.textColor(for: colorScheme))
                           }
                       }
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

#Preview {
    ExercisesListView(title: "", weekday: "", exercises: [Exercise(
        id: 1,
        position: 1,
        name: "Bench Press",
        series: [
            Series(id: 1, weight: 60, repetitions: 10),
            Series(id: 2, weight: 70, repetitions: 8),
            Series(id: 3, weight: 80, repetitions: 6)
        ]
    )])
    .environmentObject(TimerManager())
    .environmentObject(AppState())
}
