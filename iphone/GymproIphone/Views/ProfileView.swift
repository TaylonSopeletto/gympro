//
//  ProfileView.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 31/03/25.
//

import SwiftUI

struct ProfileView: View {
    
    @ObservedObject var viewModel: AuthenticationViewModel
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path){
            VStack{
                Header(title: "Profile", subtitle: "")
                Spacer()
                Button("Logout") {
                    viewModel.logout()
                }
                Spacer()
    
            }
        }
    }
}

#Preview {
    ProfileView(viewModel: AuthenticationViewModel())
}
