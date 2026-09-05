import {Ionicons} from '@expo/vector-icons';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';

export class FtueTimePresetsViewData {
    constructor(
        readonly label: string,
        readonly icon: keyof typeof Ionicons.glyphMap,
        readonly time: FtueTimePickerViewData,
    ) {}

    static defaults(): FtueTimePresetsViewData[] {
        return [
            new FtueTimePresetsViewData('Morning', 'partly-sunny-outline', new FtueTimePickerViewData(8, 0, 'AM')),
            new FtueTimePresetsViewData('Midday', 'sunny-outline', new FtueTimePickerViewData(12, 0, 'PM')),
            new FtueTimePresetsViewData('Evening', 'cloudy-night-outline', new FtueTimePickerViewData(6, 0, 'PM')),
            new FtueTimePresetsViewData('Night', 'moon-outline', new FtueTimePickerViewData(9, 0, 'PM')),
        ];
    }
}
