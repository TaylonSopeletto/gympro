//
//  GymproIphoneApp.swift
//  GymproIphone
//
//  Created by taylon on 21/09/24.
//

import SwiftUI

@main
struct GymproIphoneApp: App {
    
    @StateObject var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(AppState())
    }
}
