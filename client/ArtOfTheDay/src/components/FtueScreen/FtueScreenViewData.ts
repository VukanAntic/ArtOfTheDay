import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';
import {FtueImageChoiceViewData} from '@/src/components/FtueImageChoice/FtueImageChoiceViewData';

export class FtueScreenViewData {
    constructor(
        readonly loading: boolean,
        readonly totalSteps: number,
        readonly currentStep: number,
        readonly isTimePage: boolean,
        readonly time: FtueTimePickerViewData,
        readonly roundNumber: number,
        readonly totalRounds: number,
        readonly tiles: FtueImageChoiceViewData[],
        readonly selectedId: number | null,
        readonly canContinue: boolean,
        readonly isLastPage: boolean,
        readonly submitting: boolean,
    ) {}

    static loading(): FtueScreenViewData {
        return new FtueScreenViewData(
            true, 0, 0, true, new FtueTimePickerViewData(9, 0, 'AM'),
            0, 0, [], null, false, false, false,
        );
    }
}

export class TimeChangedIntent {
    constructor(readonly time: FtueTimePickerViewData) {}
}

export class TileSelectedIntent {
    constructor(readonly artworkId: number) {}
}

export class ContinueIntent {}

export type FtueScreenIntent = TimeChangedIntent | TileSelectedIntent | ContinueIntent;
