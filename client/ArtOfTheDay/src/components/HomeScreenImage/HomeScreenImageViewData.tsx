export default class HomeScreenImageViewData {
    title: string;
    description: string;
    imageURL: string;

    constructor(title: string, description: string, imageURL: string) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
    }
}