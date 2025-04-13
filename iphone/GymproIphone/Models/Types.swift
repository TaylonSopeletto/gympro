//
//  Types.swift
//  GymproIphone
//
//  Created by Taylon Sopeletto on 05/04/25.
//

struct Exercise: Identifiable, Codable, Hashable {
    let id: Int
    let position: Int
    let name: String
    let series: [Series]?
    
}

struct InProgressExercise: Identifiable, Codable, Hashable {
    let id: Int
    let position: Int
    let name: String
    let series: [Series]?
    let done: Bool?
}

struct Series: Identifiable, Codable, Hashable {
    var id: Int
    var weight: Int
    var repetitions: Int
}
