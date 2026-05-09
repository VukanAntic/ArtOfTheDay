import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';

export default class UserProfileViewData {
    likedArt: LikedArtScreenViewData;
    settings: SettingsScreenViewData;
    /** Image shown blurred across the full background of the profile screen */
    backgroundImageUrl: string | null;

    constructor(
        likedArt: LikedArtScreenViewData,
        settings: SettingsScreenViewData,
        backgroundImageUrl: string | null,
    ) {
        this.likedArt = likedArt;
        this.settings = settings;
        this.backgroundImageUrl = backgroundImageUrl;
    }
}
