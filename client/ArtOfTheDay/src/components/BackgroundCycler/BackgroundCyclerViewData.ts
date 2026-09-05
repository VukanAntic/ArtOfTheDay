import {ImageSourcePropType} from 'react-native';

export class BackgroundCyclerViewData {
    constructor(
        readonly images: ImageSourcePropType[],
        readonly blurRadius: number = 6,
        readonly overlayColor: string = 'rgba(0,0,0,0.38)',
        readonly topOffset: number = 0,
    ) {}
}
