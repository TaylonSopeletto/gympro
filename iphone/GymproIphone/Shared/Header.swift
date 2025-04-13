//
//  Header.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 31/03/25.
//

import SwiftUI

struct Header: View {
    @Environment(\.colorScheme) var colorScheme
    
    let title: String
    let subtitle: String
    
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text(title)
                    .foregroundColor(AppColors.textColor(for: colorScheme))
                    .padding(.leading, 20)
                    .font(.title)
                    .fontWeight(.black)
                Text(subtitle)
                    .padding(.leading, 20)
                    .font(.headline)
                    .fontWeight(.bold)
            }
            Spacer()
            NavigationLink(destination: ProfileView(viewModel: AuthenticationViewModel())) {
                   AsyncImage(url: URL(string: "https://avatars.githubusercontent.com/u/42319708?v=4")) { image in
                       image.resizable()
                   } placeholder: {
                       Color.gray
                   }
                   .frame(width: 48, height: 48)
                   .clipShape(Circle())
                   .padding(.trailing, 20)
               }
        }
    }
}

#Preview {
    Header(title: "Legs", subtitle: "Monday")
}
