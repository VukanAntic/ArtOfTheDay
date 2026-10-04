export interface GetHistoryCommand {}

export interface SetPreferredTimeCommand {
    preferredTimeInHours: number;
    preferredTimeInMinutes: number;
    timeZoneId: string;
}

export interface SetTimeZoneCommand {
    timeZoneId: string;
}
