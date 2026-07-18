import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import PersonalScreenViewData from '@/src/components/PersonalScreen/PersonalScreenViewData';
import {UserData} from '@/src/domain/UserData';

export default class UserProfileViewData {
    likedArt: LikedArtScreenViewData;
    personal: PersonalScreenViewData;
    user: UserData | null;
    /** Image shown blurred across the full background of the profile screen */
    backgroundImageUrl: string | null;

    constructor(
        likedArt: LikedArtScreenViewData,
        personal: PersonalScreenViewData,
        user: UserData | null,
        backgroundImageUrl: string | null,
    ) {
        this.likedArt = likedArt;
        this.personal = personal;
        this.user = user;
        this.backgroundImageUrl = backgroundImageUrl;
    }
}
