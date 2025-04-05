//
//  Colors.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 05/04/25.
//

import SwiftUI

struct AppColors {
    static let text = Color.primary
    static let secondaryText = Color.secondary
    static let background = Color(.systemBackground)
    static let accent = Color.accentColor

    static func textColor(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? .white : .black
    }
    
    static func cardBackgroundColor(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? Color.gray.opacity(0.2) : Color.gray.opacity(0.2)
    }
    
    static func actionBackgroundColor(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? Color.white : Color.black
    }
    static func actionForengroundColor(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? Color.black : Color.white
    }
}
