export class LikedArtItemViewData {
    id: string;
    imageUrl: string | null;
    dateLabel: string;

    constructor(id: string, imageUrl: string | null, dateLabel: string) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.dateLabel = dateLabel;
    }
}

export default class LikedArtScreenViewData {
    items: LikedArtItemViewData[];

    constructor(items: LikedArtItemViewData[]) {
        this.items = items;
    }
}
