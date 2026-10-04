import WidgetKit
import SwiftUI
import UIKit

private enum WidgetData {
    static let appGroup = "group.com.artoftheday.widget"
    static let titleKey = "widgetTitle"
    static let artistNameKey = "widgetArtistName"
    static let imageFileNameKey = "widgetImageFileName"
    static let imageDateISOKey = "widgetImageDateISO"
    static let deliveryHourKey = "widgetDeliveryHour"
    static let deliveryMinuteKey = "widgetDeliveryMinute"
    static let syncedAtISOKey = "widgetSyncedAtISO"
    static let deepLink = URL(string: "artoftheday:///")
}

private enum DeliverySchedule {
    static let defaultHour = 9
    static let defaultMinute = 0
    static let syncGrace: TimeInterval = 90

    static func isNewImageReady(now: Date, latestImageDate: Date?, syncedAt: Date?, hour: Int, minute: Int, calendar: Calendar = .current) -> Bool {
        guard let latestSlot = latestDeliverySlot(onOrBefore: now, hour: hour, minute: minute, calendar: calendar) else { return false }
        if let latestImageDate, latestImageDate >= latestSlot { return false }
        if let syncedAt, syncedAt >= latestSlot.addingTimeInterval(syncGrace) { return false }
        return true
    }

    static func latestDeliverySlot(onOrBefore now: Date, hour: Int, minute: Int, calendar: Calendar = .current) -> Date? {
        guard let today = calendar.date(bySettingHour: hour, minute: minute, second: 0, of: now) else { return nil }
        if today <= now { return today }
        return calendar.date(byAdding: .day, value: -1, to: today)
    }

    static func nextDelivery(after now: Date, hour: Int, minute: Int, calendar: Calendar = .current) -> Date {
        calendar.nextDate(
            after: now,
            matching: DateComponents(hour: hour, minute: minute, second: 0),
            matchingPolicy: .nextTime
        ) ?? now.addingTimeInterval(24 * 60 * 60)
    }
}

struct ArtEntry: TimelineEntry {
    let date: Date
    let isFresh: Bool
    let title: String
    let artistName: String
    let image: UIImage?
}

struct ArtProvider: TimelineProvider {
    func placeholder(in context: Context) -> ArtEntry {
        ArtEntry(date: Date(), isFresh: false, title: "", artistName: "", image: nil)
    }

    func getSnapshot(in context: Context, completion: @escaping (ArtEntry) -> Void) {
        completion(readEntry(for: Date()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<ArtEntry>) -> Void) {
        let now = Date()
        let delivery = deliveryTime()
        let nextDelivery = DeliverySchedule.nextDelivery(after: now, hour: delivery.hour, minute: delivery.minute)

        let entries = [readEntry(for: now), readEntry(for: nextDelivery)]
        completion(Timeline(entries: entries, policy: .after(nextDelivery)))
    }

    private func deliveryTime() -> (hour: Int, minute: Int) {
        let defaults = UserDefaults(suiteName: WidgetData.appGroup)
        let hour = defaults?.object(forKey: WidgetData.deliveryHourKey) as? Int ?? DeliverySchedule.defaultHour
        let minute = defaults?.object(forKey: WidgetData.deliveryMinuteKey) as? Int ?? DeliverySchedule.defaultMinute
        return (hour, minute)
    }

    private func readEntry(for date: Date) -> ArtEntry {
        let defaults = UserDefaults(suiteName: WidgetData.appGroup)
        let title = defaults?.string(forKey: WidgetData.titleKey) ?? ""
        let artistName = defaults?.string(forKey: WidgetData.artistNameKey) ?? ""
        let imageFileName = defaults?.string(forKey: WidgetData.imageFileNameKey)
        let imageDateISO = defaults?.string(forKey: WidgetData.imageDateISOKey)
        let syncedAtISO = defaults?.string(forKey: WidgetData.syncedAtISOKey)

        let delivery = deliveryTime()
        let isReady = DeliverySchedule.isNewImageReady(
            now: date,
            latestImageDate: imageDateISO.flatMap(Self.parseISO),
            syncedAt: syncedAtISO.flatMap(Self.parseISO),
            hour: delivery.hour,
            minute: delivery.minute
        )

        var image: UIImage?
        if !isReady,
           let imageFileName,
           let containerURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: WidgetData.appGroup) {
            let path = containerURL.appendingPathComponent(imageFileName).path
            image = UIImage(contentsOfFile: path)
        }

        return ArtEntry(
            date: date,
            isFresh: !isReady && image != nil,
            title: title,
            artistName: artistName,
            image: image
        )
    }

    private static func parseISO(_ value: String) -> Date? {
        let withFraction = ISO8601DateFormatter()
        withFraction.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        if let date = withFraction.date(from: value) { return date }

        let plain = ISO8601DateFormatter()
        plain.formatOptions = [.withInternetDateTime]
        return plain.date(from: value)
    }
}

struct ArtOfTheDayWidgetView: View {
    var entry: ArtEntry

    var body: some View {
        content
            .containerBackground(for: .widget) { background }
            .widgetURL(WidgetData.deepLink)
    }

    @ViewBuilder
    private var content: some View {
        if entry.isFresh, entry.image != nil {
            VStack(alignment: .leading, spacing: 2) {
                Spacer()
                Text(entry.title)
                    .font(.system(size: 14, weight: .bold))
                    .foregroundStyle(.white)
                    .lineLimit(2)
                if !entry.artistName.isEmpty {
                    Text(entry.artistName)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(.white.opacity(0.85))
                        .lineLimit(1)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        } else {
            VStack(spacing: 8) {
                Image(systemName: "photo.artframe")
                    .font(.system(size: 28, weight: .light))
                Text("There's a new image waiting for you!")
                    .font(.system(size: 14, weight: .semibold))
                    .multilineTextAlignment(.center)
            }
            .foregroundStyle(.primary)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }

    @ViewBuilder
    private var background: some View {
        if entry.isFresh, let image = entry.image {
            ZStack {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
                LinearGradient(
                    colors: [.black.opacity(0.0), .black.opacity(0.7)],
                    startPoint: .center,
                    endPoint: .bottom
                )
            }
        } else {
            Color("widgetBackground")
        }
    }
}

struct ArtOfTheDayWidget: Widget {
    let kind: String = "ArtOfTheDayWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: ArtProvider()) { entry in
            ArtOfTheDayWidgetView(entry: entry)
        }
        .configurationDisplayName("Art of the Day")
        .description("Shows today's featured artwork.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

#Preview(as: .systemSmall) {
    ArtOfTheDayWidget()
} timeline: {
    ArtEntry(date: .now, isFresh: false, title: "", artistName: "", image: nil)
}
