export default class FeaturedArtworkViewData {
    id: string;
    title: string;
    year: string;
    imageURL: string;
    receivedAt: Date;
    paintingDescription: string;
    artistName: string;
    artistLifespan: string;
    artistDescription: string;

    constructor(
        id: string,
        title: string,
        year: string,
        imageURL: string,
        receivedAt: Date,
        paintingDescription: string,
        artistName: string,
        artistLifespan: string,
        artistDescription: string,
    ) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.imageURL = imageURL;
        this.receivedAt = receivedAt;
        this.paintingDescription = paintingDescription;
        this.artistName = artistName;
        this.artistLifespan = artistLifespan;
        this.artistDescription = artistDescription;
    }
}
