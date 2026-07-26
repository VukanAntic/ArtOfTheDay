import {File, Paths} from 'expo-file-system';
import {isWidgetBridgeAvailable, publishLatestImage} from '@/modules/widget-bridge';
import {WIDGET_APP_GROUP, WIDGET_IMAGE_JPEG_QUALITY, WIDGET_IMAGE_MAX_DIMENSION} from '@/src/config/widgetConfig';
import {IWidgetPublisher, WidgetPublishInput} from '@/src/services/WidgetServices/IWidgetPublisher';

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

export class WidgetPublisher implements IWidgetPublisher {
    isSupported(): boolean {
        return isWidgetBridgeAvailable();
    }

    async publish(input: WidgetPublishInput): Promise<void> {
        const staging = new File(Paths.cache, `widget-staging-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`);
        const downloaded = await File.downloadFileAsync(input.imageUrl, staging, {headers: imageHeaders});

        try {
            await publishLatestImage({
                appGroup: WIDGET_APP_GROUP,
                sourceImageUri: downloaded.uri,
                imageFileName: `latest-${Date.now()}.jpg`,
                title: input.title,
                artistName: input.artistName,
                imageDateISO: input.imageDateISO,
                maxDimension: WIDGET_IMAGE_MAX_DIMENSION,
                jpegQuality: WIDGET_IMAGE_JPEG_QUALITY,
            });
        } finally {
            if (staging.exists) {
                staging.delete();
            }
        }
    }
}
