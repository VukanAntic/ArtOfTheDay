import {useLocalSearchParams} from 'expo-router';
import UserProfileView from '@/src/components/UserProfile/UserProfileView';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';
import {LikedArtworkCellViewData} from "@/src/components/LikedArtworkCell/LikedArtworkCellViewData";

const likedArt = new LikedArtScreenViewData([
    new LikedArtworkCellViewData('1', null, 'Nov 11th'),
    new LikedArtworkCellViewData('2', null, 'Nov 10th'),
    new LikedArtworkCellViewData('3', null, 'Nov 9th'),
    new LikedArtworkCellViewData('4', null, 'Nov 8th'),
    new LikedArtworkCellViewData('5', null, 'Nov 7th'),
    new LikedArtworkCellViewData('6', null, 'Nov 6th'),
    new LikedArtworkCellViewData('7', null, 'Nov 5th'),
    new LikedArtworkCellViewData('8', null, 'Nov 4th'),
    new LikedArtworkCellViewData('9', null, 'Nov 3rd'),
    new LikedArtworkCellViewData('10', null, 'Nov 2nd'),
    new LikedArtworkCellViewData('11', null, 'Nov 1st'),
    new LikedArtworkCellViewData('12', null, 'Oct 31st'),
]);

const settings = new SettingsScreenViewData(
    /* likedGenres  */ ['Impressionism', 'Surrealism', 'Bauhaus'],
    /* likedArtists */ ['Vincent van Gogh', 'Claude Monet'],
    /* allGenres    */ [
        'Impressionism', 'Post-Impressionism', 'Surrealism', 'Cubism',
        'Baroque', 'Romanticism', 'Realism', 'Abstract Expressionism',
        'Art Nouveau', 'Rococo', 'Bauhaus', 'Dadaism',
        'Fauvism', 'Symbolism', 'Neoclassicism', 'Pop Art',
    ],
    /* allArtists   */ [
        'Vincent van Gogh', 'Claude Monet', 'Pablo Picasso', 'Rembrandt van Rijn',
        'Leonardo da Vinci', 'Michelangelo', 'Salvador Dalí', 'Frida Kahlo',
        'Johannes Vermeer', 'Édouard Manet', 'Paul Cézanne', 'Georges Seurat',
        'Caravaggio', 'Francisco Goya', 'J.M.W. Turner', 'Wassily Kandinsky',
    ],
);

export default function ProfileRoute() {
    // The home screen forwards the currently active artwork's URL via the `bg`
    // route param so the profile screen can mirror the same blurred background.
    const {bg} = useLocalSearchParams<{ bg?: string }>();

    const viewData = new UserProfileViewData(likedArt, settings, bg || null);

    return <UserProfileView viewData={viewData}/>;
}
