import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import PersonalScreenViewData from '@/src/components/PersonalScreen/PersonalScreenViewData';
import {UserData} from '@/src/domain/UserData';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';

export default class UserProfileViewData {
    likedArt: LikedArtScreenViewData;
    personal: PersonalScreenViewData;
    user: UserData | null;
    preferredTime: FtueTimePickerViewData;
    /** Image shown blurred across the full background of the profile screen */
    backgroundImageUrl: string | null;
    profileImageUrl: string | null;

    constructor(
        likedArt: LikedArtScreenViewData,
        personal: PersonalScreenViewData,
        user: UserData | null,
        preferredTime: FtueTimePickerViewData,
        backgroundImageUrl: string | null,
        profileImageUrl: string | null,
    ) {
        this.likedArt = likedArt;
        this.personal = personal;
        this.user = user;
        this.preferredTime = preferredTime;
        this.backgroundImageUrl = backgroundImageUrl;
        this.profileImageUrl = profileImageUrl;
    }
}
