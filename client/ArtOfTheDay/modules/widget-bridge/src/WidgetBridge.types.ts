export type PublishLatestImageParams = {
    appGroup: string;
    sourceImageUri: string;
    imageFileName: string;
    title: string;
    artistName: string;
    imageDateISO: string;
    maxDimension?: number;
    jpegQuality?: number;
};

export type WidgetBridgeModule = {
    isAvailable(): boolean;
    publishLatestImage(params: PublishLatestImageParams): Promise<void>;
    reload(): void;
};
