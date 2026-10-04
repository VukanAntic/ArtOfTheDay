export type PublishLatestImageParams = {
    appGroup: string;
    sourceImageUri: string;
    imageFileName: string;
    title: string;
    artistName: string;
    imageDateISO: string;
    maxPixels?: number;
    jpegQuality?: number;
};

export type WidgetBridgeModule = {
    isAvailable(): boolean;
    publishLatestImage(params: PublishLatestImageParams): Promise<void>;
    publishSchedule(appGroup: string, hours: number, minutes: number, syncedAtISO: string): Promise<void>;
    reload(): void;
};
