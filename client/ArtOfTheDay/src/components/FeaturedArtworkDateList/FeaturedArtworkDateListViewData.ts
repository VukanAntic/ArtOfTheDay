import {Animated} from 'react-native';

export default class FeaturedArtworkDateListViewData {
    dates: Date[];
    scrollX: Animated.Value;
    pageWidth: number;
    activeIndex: number;

    constructor(dates: Date[], scrollX: Animated.Value, pageWidth: number, activeIndex: number) {
        this.dates = dates;
        this.scrollX = scrollX;
        this.pageWidth = pageWidth;
        this.activeIndex = activeIndex;
    }
}