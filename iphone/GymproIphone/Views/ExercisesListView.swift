import SwiftUI

struct ExercisesListView: View {
    
    let items = ["Push ups", "Squats", "Lunges"]
    
    var body: some View {
        VStack {
            Text("00:40:41")
                .font(.largeTitle)
                .padding(10)
            Text("Legs")
                .bold()
                .font(.title2)
                .padding(20)
                .frame(maxWidth: .infinity, alignment: .leading)
            VStack {
                ForEach(items, id: \.self) { item in
                    HStack {
                        Text(item)
                            .padding()
                        Spacer()
                    }
                    .frame(maxWidth: .infinity, maxHeight: 70)
                    .background(Color.gray)
                    .cornerRadius(10)
                    .padding(.horizontal)
                    .foregroundColor(.white)
                }
            }
        }
    }
}

#Preview {
    ExercisesListView()
}
