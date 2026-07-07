import {ArtworkData} from '@/src/domain/ArtworkData';
import DetailedArtworkPopupViewData from '@/src/components/DetailedArtworkPopup/DetailedArtworkPopupViewData';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date: Date): string {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export class LikedArtworkCellViewData {
    readonly id: string;
    readonly imageUrl: string | null;
    readonly dateLabel: string;
    readonly popupData: DetailedArtworkPopupViewData;

    constructor(artwork: ArtworkData, receivedAt: Date | null) {
        this.id = String(artwork.id);
        this.imageUrl = artwork.imageUrl;
        this.dateLabel = receivedAt ? formatDate(receivedAt) : '';
        this.popupData = new DetailedArtworkPopupViewData(artwork, receivedAt);
    }
}
