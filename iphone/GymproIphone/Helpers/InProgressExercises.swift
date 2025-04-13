//
//  InProgressExercises.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 08/04/25.
//

import Foundation
import SwiftUI

class AppState: ObservableObject {
    @Published var exercises: [Exercise] = []
}
