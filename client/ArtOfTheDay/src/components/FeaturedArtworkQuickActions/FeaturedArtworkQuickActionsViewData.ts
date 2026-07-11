export default class FeaturedArtworkQuickActionsViewData {
    isImageLiked: boolean;
    onToggleLike: () => void;
    onSeeMore: () => void;

    constructor(isImageLiked: boolean, onToggleLike: () => void, onSeeMore: () => void) {
        this.isImageLiked = isImageLiked;
        this.onToggleLike = onToggleLike;
        this.onSeeMore = onSeeMore;
    }
}