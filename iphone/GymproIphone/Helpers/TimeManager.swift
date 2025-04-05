//
//  TimeManager.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 05/04/25.
//

import Foundation
import SwiftUI

class TimerManager: ObservableObject {
    @Published var elapsedTime: TimeInterval = 0
    private var timer: Timer?
    private var startTime: Date?

    func start() {
        startTime = Date()
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
            if let start = self.startTime {
                self.elapsedTime = Date().timeIntervalSince(start)
            }
        }
    }

    func stop() {
        timer?.invalidate()
        timer = nil
    }

    func reset() {
        stop()
        elapsedTime = 0
        startTime = nil
    }

    var isRunning: Bool {
        timer != nil
    }

    func formattedTime() -> String {
        let totalSeconds = Int(elapsedTime)
        let hours = totalSeconds / 3600
        let minutes = (totalSeconds % 3600) / 60
        let seconds = totalSeconds % 60
        return String(format: "%02d:%02d:%02d", hours, minutes, seconds)
    }
}
