import DetailedArtworkPopupViewData from '@/src/components/DetailedArtworkPopup/DetailedArtworkPopupViewData';

export class LikedArtworkCellViewData {
    id: string;
    imageUrl: string | null;
    dateLabel: string;
    popupData: DetailedArtworkPopupViewData;

    constructor(id: string, imageUrl: string | null, dateLabel: string, popupData: DetailedArtworkPopupViewData) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.dateLabel = dateLabel;
        this.popupData = popupData;
    }
}
