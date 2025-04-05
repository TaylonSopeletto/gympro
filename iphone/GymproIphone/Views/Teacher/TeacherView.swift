//
//  TeacherView.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 03/04/25.
//

import SwiftUI

struct TeacherView: View {
    
    @Environment(\.colorScheme) var colorScheme
    @State private var responseStudents: [StudentsResponse] = []
    @State private var responseMessage = ""
    
    func getStudents() {
        StudentsService.shared.get() { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let students):
                    responseStudents = students
                    print(students)
                    
                case .failure(let error):
                    self.responseMessage = "Error: \(error.localizedDescription)"
                }
            }
        }
    }
    
    var body: some View {
        NavigationStack{
            Header(title: "Teacher area", subtitle: "students")
            Spacer()
            HStack{
                Text("Students")
                    .font(.title2)
                    .fontWeight(.bold)
                Spacer()
            }
            .padding(.horizontal)
            .padding(.bottom, 20)
            VStack {
                ForEach(responseStudents, id: \.full_name) { student in
                    HStack {
                        Text(student.full_name.capitalized)
                            .padding()
                        Spacer()
                    }
                    .frame(maxWidth: .infinity, maxHeight: 70)
                    .background(AppColors.cardBackgroundColor(for: colorScheme))
                    .foregroundColor(AppColors.textColor(for: colorScheme))
                    .cornerRadius(10)
                    .padding(.horizontal)
                    
                }
            }
            HStack{
                Spacer()
                Button(action: {}){
                    Image(systemName: "plus.circle")
                }
                .font(.title)
                .foregroundColor(.black)
            }
            .padding(.horizontal)
            .padding(.top, 10)
            Spacer()
        }.onAppear(){
            getStudents()
        }
       
    }
}

#Preview {
    TeacherView()
}
