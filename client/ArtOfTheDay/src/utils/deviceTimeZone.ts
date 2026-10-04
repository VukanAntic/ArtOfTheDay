export function getDeviceTimeZoneId(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
