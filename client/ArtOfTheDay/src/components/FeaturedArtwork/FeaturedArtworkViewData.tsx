export default class FeaturedArtworkViewData {
    id: string;
    title: string;
    description: string;
    imageURL: string;
    receivedAt: Date;

    constructor(id: string, title: string, description: string, imageURL: string, receivedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.receivedAt = receivedAt;
    }
}