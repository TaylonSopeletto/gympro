import SwiftUI
import CoreML
import CoreImage
import UIKit

struct AIView: View {
    @Environment(\.colorScheme) var colorScheme
    @StateObject private var handler = CameraModelHandler()
    
    @State private var currentImage: String = "Image_6"
    private let imageOptions = ["Image_1", "Image_6", "Image_7"]
    
    var body: some View {
        VStack {
            Picker("Select Image", selection: $currentImage) {
                ForEach(imageOptions, id: \.self) { imageName in
                    Text(imageName).tag(imageName)
                }
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding()

            if let uiImage = UIImage(named: currentImage) {
                Image(uiImage: uiImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .padding()
            }

            VStack {
                Text(handler.prediction)
                    .font(.title)
                    .foregroundColor(.white)
                    .padding()
                    .background(.black.opacity(0.5))
                    .clipShape(Capsule())
            }

            Button(action: {
                handler.runMockImagePrediction(imageName: currentImage)
            }) {
                Text("Run prediction")
            }
            .frame(width: 150, height: 50)
            .background(AppColors.actionBackgroundColor(for: colorScheme))
            .foregroundColor(AppColors.actionForengroundColor(for: colorScheme))
            .cornerRadius(10)
            .padding(30)
        }
        .edgesIgnoringSafeArea(.all)
    }
}

#Preview {
    AIView()
}
