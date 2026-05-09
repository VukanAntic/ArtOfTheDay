import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import PreferenceSectionView from '@/src/components/PreferenceSection/PreferenceSectionView';
import PreferenceSectionViewData from '@/src/components/PreferenceSection/PreferenceSectionViewData';
import SettingsScreenViewData from './SettingsScreenViewData';
import style from './SettingsScreenViewStyle';

type Props = {
    viewData: SettingsScreenViewData;
    width: number;
};

export default function SettingsScreenView({viewData, width}: Props) {
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
                    onRemove={name => setLikedGenres(prev => prev.filter(g => g !== name))}
                    onAdd={name => setLikedGenres(prev => [...prev, name])}
                />

                <PreferenceSectionView
                    viewData={new PreferenceSectionViewData('Your artists', likedArtists, viewData.allArtists)}
                    onRemove={name => setLikedArtists(prev => prev.filter(a => a !== name))}
                    onAdd={name => setLikedArtists(prev => [...prev, name])}
                />
            </ScrollView>
        </View>
    );
}
