import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import PersonalScreenViewData from '@/src/components/PersonalScreen/PersonalScreenViewData';
import {UserData} from '@/src/domain/UserData';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';

export default class UserProfileViewData {
    likedArt: LikedArtScreenViewData;
    personal: PersonalScreenViewData;
    user: UserData | null;
    preferredTime: FtueTimePickerViewData;
    /** Artworks cycled, blurred, across the full background of the profile screen */
    backgroundImageUrls: string[];
    profileImageUrl: string | null;

    constructor(
        likedArt: LikedArtScreenViewData,
        personal: PersonalScreenViewData,
        user: UserData | null,
        preferredTime: FtueTimePickerViewData,
        backgroundImageUrls: string[],
        profileImageUrl: string | null,
    ) {
        this.likedArt = likedArt;
        this.personal = personal;
        this.user = user;
        this.preferredTime = preferredTime;
        this.backgroundImageUrls = backgroundImageUrls;
        this.profileImageUrl = profileImageUrl;
    }
}
