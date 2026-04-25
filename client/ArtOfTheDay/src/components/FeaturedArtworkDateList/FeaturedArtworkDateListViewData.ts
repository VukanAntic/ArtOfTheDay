export default class FeaturedArtworkDateListViewData {
    dates: Date[];
    activeIndex: number;

    constructor(dates: Date[], activeIndex: number) {
        this.dates = dates;
        this.activeIndex = dates.length - 1;
    }
}