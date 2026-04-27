export default class FeaturedArtworkQuickActionsViewData {
    isImageLiked: boolean;
    onSeeMore: () => void;

    constructor(isImageLiked: boolean, onSeeMore: () => void) {
        this.isImageLiked = isImageLiked;
        this.onSeeMore = onSeeMore;
    }
}