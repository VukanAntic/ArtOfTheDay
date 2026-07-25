export interface GetHistoryCommand {}

export interface SetPreferredTimeCommand {
    preferredTimeInHours: number;
    preferredTimeInMinutes: number;
    timeZoneId: string;
}
