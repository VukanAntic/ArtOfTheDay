import {Platform} from 'react-native';
import {requireNativeModule} from 'expo';
import type {PublishLatestImageParams, WidgetBridgeModule} from './src/WidgetBridge.types';

function loadNativeModule(): WidgetBridgeModule | null {
    if (Platform.OS !== 'ios') return null;
    try {
        return requireNativeModule<WidgetBridgeModule>('WidgetBridge');
    } catch {
        return null;
    }
}

const nativeModule = loadNativeModule();

export type {PublishLatestImageParams};

export function isWidgetBridgeAvailable(): boolean {
    return nativeModule?.isAvailable() ?? false;
}

export async function publishLatestImage(params: PublishLatestImageParams): Promise<void> {
    if (!nativeModule) return;
    await nativeModule.publishLatestImage(params);
}

export async function publishSchedule(appGroup: string, hours: number, minutes: number, syncedAtISO: string): Promise<void> {
    if (!nativeModule) return;
    await nativeModule.publishSchedule(appGroup, hours, minutes, syncedAtISO);
}

export function reloadWidgets(): void {
    nativeModule?.reload();
}
