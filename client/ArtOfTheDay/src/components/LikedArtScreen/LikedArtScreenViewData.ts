import {LikedArtworkCellViewData} from "@/src/components/LikedArtworkCell/LikedArtworkCellViewData";

export default class LikedArtScreenViewData {
    items: LikedArtworkCellViewData[];

    constructor(items: LikedArtworkCellViewData[]) {
        this.items = items;
    }
}
