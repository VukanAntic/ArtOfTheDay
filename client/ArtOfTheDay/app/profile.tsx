import UserProfileView from '@/src/components/UserProfile/UserProfileView';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData, {LikedArtItemViewData} from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';

const likedArt = new LikedArtScreenViewData([
    new LikedArtItemViewData('1',  null, 'Nov 11th'),
    new LikedArtItemViewData('2',  null, 'Nov 10th'),
    new LikedArtItemViewData('3',  null, 'Nov 9th'),
    new LikedArtItemViewData('4',  null, 'Nov 8th'),
    new LikedArtItemViewData('5',  null, 'Nov 7th'),
    new LikedArtItemViewData('6',  null, 'Nov 6th'),
    new LikedArtItemViewData('7',  null, 'Nov 5th'),
    new LikedArtItemViewData('8',  null, 'Nov 4th'),
    new LikedArtItemViewData('9',  null, 'Nov 3rd'),
    new LikedArtItemViewData('10', null, 'Nov 2nd'),
    new LikedArtItemViewData('11', null, 'Nov 1st'),
    new LikedArtItemViewData('12', null, 'Oct 31st'),
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

const viewData = new UserProfileViewData(likedArt, settings);

export default function ProfileRoute() {
    return <UserProfileView viewData={viewData}/>;
}
