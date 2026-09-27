import {SeenImageData} from '@/src/domain/SeenImageData';

export class UserHistoryData {
    constructor(
        readonly seenImages: SeenImageData[],
        readonly preferredTimeInHours: number,
        readonly preferredTimeInMinutes: number,
    ) {}

    withSeenImages(seenImages: SeenImageData[]): UserHistoryData {
        return new UserHistoryData(seenImages, this.preferredTimeInHours, this.preferredTimeInMinutes);
    }
}
