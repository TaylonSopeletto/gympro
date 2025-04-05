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

struct Series: Identifiable, Codable, Hashable {
    let id: Int
    let weight: Int
    let repetitions: Int
}
