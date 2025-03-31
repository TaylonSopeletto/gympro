import SwiftUI

struct ExercisesListView: View {
    
    var title = ""
    var exercises : [Exercise] = []
    
    @State private var selectedExercise: Exercise?
    
    var body: some View {
        NavigationStack {
            VStack {
                Text("00:00:00")
                    .font(.headline)
                    .padding(10)
                Text(title.capitalized)
                    .bold()
                    .font(.title2)
                    .padding(20)
                    .frame(maxWidth: .infinity, alignment: .leading)
                VStack {
                       ForEach(exercises, id: \.name) { exercise in
                           NavigationLink(destination: ExerciseView(exercise: exercise)) {
                               HStack {
                                   Text(exercise.name)
                                       .padding()
                                   Spacer()
                               }
                               .frame(maxWidth: .infinity, maxHeight: 70)
                               .background(Color.gray.opacity(0.1))
                               .cornerRadius(10)
                               .padding(.horizontal)
                               .foregroundColor(.black)
                           }
                       }
                }
                Button(action: {}){
                    Text("Stop")
                }
                .frame(width: 150, height: 50)
                .background(.black)
                .foregroundColor(.white)
                .cornerRadius(10)
                .padding(30)
                
            }
            //.navigationBarBackButtonHidden(true)
            
            .navigationDestination(for: Exercise?.self) { exercise in
                if let exercise = exercise {
                    ExerciseView(exercise: exercise)
                }
            }
        }
    }
}

#Preview {
    ExercisesListView()
}
