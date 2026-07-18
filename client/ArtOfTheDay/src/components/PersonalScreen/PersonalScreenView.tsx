import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import PreferenceSectionView from '@/src/components/PreferenceSection/PreferenceSectionView';
import PreferenceSectionViewData from '@/src/components/PreferenceSection/PreferenceSectionViewData';
import {
    SettingsPreferenceIntent,
    LikeGenreIntent,
    UnlikeGenreIntent,
    LikeArtistIntent,
    UnlikeArtistIntent,
} from '@/src/components/UserProfile/UserProfileController';
import PersonalScreenViewData from './PersonalScreenViewData';
import style from './PersonalScreenViewStyle';

type Props = {
    viewData: PersonalScreenViewData;
    width: number;
    onPreferenceIntent: (intent: SettingsPreferenceIntent) => void;
};

export default function PersonalScreenView({viewData, width, onPreferenceIntent}: Props) {
    const [likedGenres, setLikedGenres] = useState(viewData.likedGenres);
    const [likedArtists, setLikedArtists] = useState(viewData.likedArtists);

    return (
        <View style={[style.container, {width}]}>
            <ScrollView
                style={style.scroll}
                contentContainerStyle={style.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <PreferenceSectionView
                    viewData={new PreferenceSectionViewData('Your genres', likedGenres, viewData.allGenres)}
                    onRemove={name => { setLikedGenres(prev => prev.filter(g => g !== name)); onPreferenceIntent(new UnlikeGenreIntent(name)); }}
                    onAdd={name => { setLikedGenres(prev => [...prev, name]); onPreferenceIntent(new LikeGenreIntent(name)); }}
                />

                <PreferenceSectionView
                    viewData={new PreferenceSectionViewData('Your artists', likedArtists, viewData.allArtists)}
                    onRemove={name => { setLikedArtists(prev => prev.filter(a => a !== name)); onPreferenceIntent(new UnlikeArtistIntent(name)); }}
                    onAdd={name => { setLikedArtists(prev => [...prev, name]); onPreferenceIntent(new LikeArtistIntent(name)); }}
                />
            </ScrollView>
        </View>
    );
}
