export type Period = 'AM' | 'PM';

export class FtueTimePickerViewData {
    constructor(
        readonly hours: number,
        readonly minutes: number,
        readonly period: Period,
    ) {}

    to24Hour(): {hours24: number; minutes: number} {
        let hours24 = this.hours % 12;
        if (this.period === 'PM') {
            hours24 += 12;
        }
        return {hours24, minutes: this.minutes};
    }
}
