import ExpoModulesCore
import WidgetKit
import UIKit

enum WidgetBridgeError: Error, LocalizedError {
  case containerNotFound(String)
  case imageUnreadable(String)
  case encodingFailed

  var errorDescription: String? {
    switch self {
    case .containerNotFound(let group):
      return "App Group container not found for \(group). Check the entitlement on both the app and widget targets."
    case .imageUnreadable(let path):
      return "Could not read source image at \(path)."
    case .encodingFailed:
      return "Could not encode the artwork to JPEG."
    }
  }
}

struct PublishParams: Record {
  @Field var appGroup: String
  @Field var sourceImageUri: String
  @Field var imageFileName: String
  @Field var title: String
  @Field var artistName: String
  @Field var imageDateISO: String
  @Field var maxDimension: Double = 1000
  @Field var jpegQuality: Double = 0.8
}

public class WidgetBridgeModule: Module {
  private enum Keys {
    static let title = "widgetTitle"
    static let artistName = "widgetArtistName"
    static let imageFileName = "widgetImageFileName"
    static let imageDateISO = "widgetImageDateISO"
  }

  private static let imagePrefix = "latest-"

  public func definition() -> ModuleDefinition {
    Name("WidgetBridge")

    Function("isAvailable") { () -> Bool in
      return true
    }

    AsyncFunction("publishLatestImage") { (params: PublishParams) throws in
      try self.publish(params)
    }

    Function("reload") {
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }
    }
  }

  private func publish(_ params: PublishParams) throws {
    guard let containerURL = FileManager.default.containerURL(
      forSecurityApplicationGroupIdentifier: params.appGroup
    ) else {
      throw WidgetBridgeError.containerNotFound(params.appGroup)
    }

    let sourcePath = params.sourceImageUri.replacingOccurrences(of: "file://", with: "")
    guard let sourceImage = UIImage(contentsOfFile: sourcePath) else {
      throw WidgetBridgeError.imageUnreadable(sourcePath)
    }

    let scaled = downscale(sourceImage, maxDimension: CGFloat(params.maxDimension))
    guard let jpegData = scaled.jpegData(compressionQuality: CGFloat(params.jpegQuality)) else {
      throw WidgetBridgeError.encodingFailed
    }

    deletePreviousImages(in: containerURL, keeping: params.imageFileName)

    let destURL = containerURL.appendingPathComponent(params.imageFileName)
    try jpegData.write(to: destURL, options: .atomic)

    let defaults = UserDefaults(suiteName: params.appGroup)
    defaults?.set(params.title, forKey: Keys.title)
    defaults?.set(params.artistName, forKey: Keys.artistName)
    defaults?.set(params.imageFileName, forKey: Keys.imageFileName)
    defaults?.set(params.imageDateISO, forKey: Keys.imageDateISO)

    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadAllTimelines()
    }
  }

  private func downscale(_ image: UIImage, maxDimension: CGFloat) -> UIImage {
    let longest = max(image.size.width, image.size.height)
    guard longest > maxDimension, longest > 0 else { return image }
    let scale = maxDimension / longest
    let newSize = CGSize(width: image.size.width * scale, height: image.size.height * scale)
    let format = UIGraphicsImageRendererFormat.default()
    format.scale = 1
    let renderer = UIGraphicsImageRenderer(size: newSize, format: format)
    return renderer.image { _ in
      image.draw(in: CGRect(origin: .zero, size: newSize))
    }
  }

  private func deletePreviousImages(in containerURL: URL, keeping keepName: String) {
    let manager = FileManager.default
    guard let files = try? manager.contentsOfDirectory(
      at: containerURL,
      includingPropertiesForKeys: nil
    ) else { return }

    for file in files
    where file.lastPathComponent.hasPrefix(Self.imagePrefix) && file.lastPathComponent != keepName {
      try? manager.removeItem(at: file)
    }
  }
}
