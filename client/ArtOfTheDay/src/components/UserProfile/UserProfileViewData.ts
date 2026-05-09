import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';

export default class UserProfileViewData {
    likedArt: LikedArtScreenViewData;
    settings: SettingsScreenViewData;

    constructor(likedArt: LikedArtScreenViewData, settings: SettingsScreenViewData) {
        this.likedArt = likedArt;
        this.settings = settings;
    }
}
