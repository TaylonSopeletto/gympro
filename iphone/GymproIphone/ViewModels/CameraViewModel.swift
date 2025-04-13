import CoreML
import SwiftUI
import CoreImage
import Vision
import UIKit

class CameraModelHandler: NSObject, ObservableObject {
    @Published var prediction: String = "Analyzing…"
    private let model: GymClassifier
    private let ciContext = CIContext()
    private let targetSize = CGSize(width: 150, height: 150)
    
    override init() {
        do {
            model = try GymClassifier(configuration: MLModelConfiguration())
        } catch {
            fatalError("❌ Could not load TreadmillClassifier: \(error)")
        }
    }
    
    func runMockImagePrediction(imageName: String) {
        guard let image = UIImage(named: imageName) else {
            print("❌ Could not load image: \(imageName)")
            return
        }
        
        guard let ciImage = CIImage(image: image) else {
            print("❌ Could not convert UIImage to CIImage")
            return
        }
        
        let scaleX = targetSize.width / ciImage.extent.width
        let scaleY = targetSize.height / ciImage.extent.height
        let scaled = ciImage
            .transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))
            .cropped(to: CGRect(origin: .zero, size: targetSize))
        
        var resizedBuffer: CVPixelBuffer?
        let attrs: [String: Any] = [
            kCVPixelBufferCGImageCompatibilityKey as String: true,
            kCVPixelBufferCGBitmapContextCompatibilityKey as String: true,
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
            kCVPixelBufferWidthKey as String: Int(targetSize.width),
            kCVPixelBufferHeightKey as String: Int(targetSize.height),
        ]
        
        CVPixelBufferCreate(kCFAllocatorDefault,
                            Int(targetSize.width),
                            Int(targetSize.height),
                            kCVPixelFormatType_32BGRA,
                            attrs as CFDictionary,
                            &resizedBuffer)
        guard let rgbBuffer = resizedBuffer else { return }
        
        ciContext.render(scaled, to: rgbBuffer)
        
        do {
            let input = GymClassifierInput(conv2d_input: rgbBuffer)
            let out = try model.prediction(input: input)
            
            let mlArray = out.Identity
            var probs = [Double]()
            for i in 0..<mlArray.count {
                probs.append(mlArray[i].doubleValue)
            }
            let labels = ["cable_crossover_machine", "exercise_bike", "flat_bench_press", "gym_treadmill", "leg_curl_machine", "leg_extension_machine", "squat_rack"]
            let best = zip(labels, probs).max(by: { $0.1 < $1.1 })
            
            if let (label, confidence) = best {
                DispatchQueue.main.async {
                    self.prediction = "\(label) (\(Int(confidence * 100))%)"
                }
            }
        } catch {
            print("❌ Error running prediction: \(error)")
        }
    }
}
