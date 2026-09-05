import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';
import {FtueImageChoiceViewData} from '@/src/components/FtueImageChoice/FtueImageChoiceViewData';

export class FtueScreenViewData {
    constructor(
        readonly loading: boolean,
        readonly totalSteps: number,
        readonly currentStep: number,
        readonly isTimePage: boolean,
        readonly time: FtueTimePickerViewData,
        readonly isExactTime: boolean,
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
            true, 0, 0, true, new FtueTimePickerViewData(8, 0, 'AM'), false,
            0, 0, [], null, false, false, false,
        );
    }
}

export class TimeChangedIntent {
    constructor(readonly time: FtueTimePickerViewData) {}
}

export class ExactTimeToggledIntent {
    constructor(readonly exact: boolean) {}
}

export class TileSelectedIntent {
    constructor(readonly artworkId: number) {}
}

export class ContinueIntent {}

export type FtueScreenIntent = TimeChangedIntent | ExactTimeToggledIntent | TileSelectedIntent | ContinueIntent;
