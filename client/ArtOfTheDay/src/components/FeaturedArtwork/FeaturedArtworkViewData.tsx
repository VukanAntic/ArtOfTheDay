export default class FeaturedArtworkViewData {
    id: string;
    title: string;
    description: string;
    imageURL: string;

    constructor(id: string, title: string, description: string, imageURL: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
    }
}