export type Period = 'AM' | 'PM';

export class FtueTimePickerViewData {
    constructor(
        readonly hours: number,
        readonly minutes: number,
        readonly period: Period,
    ) {}

    static from24Hour(hours24: number, minutes: number): FtueTimePickerViewData {
        const period: Period = hours24 >= 12 ? 'PM' : 'AM';
        const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
        return new FtueTimePickerViewData(hours, minutes, period);
    }

    format(): string {
        return `${this.hours}:${String(this.minutes).padStart(2, '0')} ${this.period}`;
    }

    equals(other: FtueTimePickerViewData): boolean {
        return this.hours === other.hours && this.minutes === other.minutes && this.period === other.period;
    }

    to24Hour(): {hours24: number; minutes: number} {
        let hours24 = this.hours % 12;
        if (this.period === 'PM') {
            hours24 += 12;
        }
        return {hours24, minutes: this.minutes};
    }
}
