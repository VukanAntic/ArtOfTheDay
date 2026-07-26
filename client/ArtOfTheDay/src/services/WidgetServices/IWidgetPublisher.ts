export interface WidgetPublishInput {
    imageUrl: string;
    title: string;
    artistName: string;
    imageDateISO: string;
}

export interface IWidgetPublisher {
    isSupported(): boolean;

    publish(input: WidgetPublishInput): Promise<void>;
}
