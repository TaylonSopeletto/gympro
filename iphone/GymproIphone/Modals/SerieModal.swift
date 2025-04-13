//
//  SerieModal.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 08/04/25.
//

import SwiftUI

struct ModalView: View {
    
    @Environment(\.colorScheme) var colorScheme
    let serie: Series
    @Environment(\.dismiss) var dismiss
    @State private var repetitions: String = ""
    @State private var weight: String = ""
    
    
    init(serie: Series) {
        self.serie = serie
    }

    var body: some View {
        VStack {
            Spacer()
            Text(String(serie.weight))
                .font(.title)
                .padding()
            Spacer()
            Text("Repetitions:")
                .frame(width: 260, alignment: .leading)
            TextField("repetitions", text: $repetitions)
                .frame(width: 240)
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(10)
                .padding(.horizontal)
                .autocapitalization(.none)
                .padding(.bottom, 20)
            
            Text("Weight (KG):")
                .frame(width: 260, alignment: .leading)
            TextField("weight", text: $weight)
                .frame(width: 240)
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(10)
                .padding(.horizontal)
                .autocapitalization(.none)

            Button("Confirm") {
                dismiss()
            }
            .frame(width: 150, height: 50)
            .background(AppColors.actionBackgroundColor(for: colorScheme))
            .foregroundColor(AppColors.actionForengroundColor(for: colorScheme))
            .cornerRadius(10)
            .padding(30)
        }
        
    }
}
