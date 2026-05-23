export class LikedArtworkCellViewData {
    id: string;
    imageUrl: string | null;
    dateLabel: string;

    constructor(id: string, imageUrl: string | null, dateLabel: string) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.dateLabel = dateLabel;
    }
}
