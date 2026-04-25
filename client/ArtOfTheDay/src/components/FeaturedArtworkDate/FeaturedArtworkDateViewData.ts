export default class FeaturedArtworkDateViewData {
    receivedAt: Date;
    isSelected: boolean;

    constructor(receivedAt: Date, isSelected: boolean) {
        this.receivedAt = receivedAt;
        this.isSelected = isSelected;
    }
}