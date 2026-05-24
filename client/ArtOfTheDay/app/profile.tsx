import {useLocalSearchParams} from 'expo-router';
import UserProfileView from '@/src/components/UserProfile/UserProfileView';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';
import {LikedArtworkCellViewData} from '@/src/components/LikedArtworkCell/LikedArtworkCellViewData';
import DetailedArtworkPopupViewData from '@/src/components/DetailedArtworkPopup/DetailedArtworkPopupViewData';

const medusasRaft = new DetailedArtworkPopupViewData(
    '1',
    'Raft of the Medusa',
    '1819.',
    'https://www.artic.edu/iiif/2/8f5f8f8f-8765-b04e-8ffa-f4379d9511f5/full/843,/0/default.jpg',
    new Date('2024-11-11'),
    'The Raft of the Medusa depicts the harrowing aftermath of the wreck of the French naval frigate Méduse, which ran aground off the coast of Mauritania in 1816. One hundred and forty-seven crew members were set adrift on a makeshift raft; only fifteen survived.',
    'Théodore Géricault',
    '1791. - 1824.',
    'Théodore Géricault was a pioneering French Romantic painter and lithographer whose brief life produced some of the most dramatic and visceral works of the 19th century.',
);

const madameX = new DetailedArtworkPopupViewData(
    '2',
    'Madame X',
    '1884.',
    'https://www.artic.edu/iiif/2/5a047a1c-d36e-e88d-05e7-845d3936159b/full/843,/0/default.jpg',
    new Date('2024-11-10'),
    'Madame X is a portrait of Virginie Amélie Avegno Gautreau, a Parisian socialite of American origin, renowned for her beauty. When Sargent exhibited the painting at the 1884 Paris Salon it caused a scandal.',
    'John Singer Sargent',
    '1856. - 1925.',
    'John Singer Sargent was an American expatriate artist considered the leading portrait painter of his generation, celebrated for his technical virtuosity and mastery of light.',
);

const starryNight = new DetailedArtworkPopupViewData(
    '3',
    'Starry Night Over the Rhône',
    '1888.',
    'https://www.artic.edu/iiif/2/beeba230-022f-449a-a2fd-c0cf6c47d232/full/843,/0/default.jpg',
    new Date('2024-11-09'),
    'Painted in Arles before van Gogh entered the Saint-Paul-de-Mausole asylum, this canvas shows the Rhône river at night, lit by the reflections of gas lamps lining the quay.',
    'Vincent van Gogh',
    '1853. - 1890.',
    'Vincent van Gogh was a Dutch Post-Impressionist painter who is among the most famous and influential figures in Western art. His distinctive style was characterised by bold colours and expressive brushwork.',
);

const artworks = [medusasRaft, madameX, starryNight];

const likedArt = new LikedArtScreenViewData([
    new LikedArtworkCellViewData('1', medusasRaft.imageURL, 'Nov 11th', medusasRaft),
    new LikedArtworkCellViewData('2', madameX.imageURL, 'Nov 10th', madameX),
    new LikedArtworkCellViewData('3', starryNight.imageURL, 'Nov 9th', starryNight),
    new LikedArtworkCellViewData('4', medusasRaft.imageURL, 'Nov 8th', artworks[0]),
    new LikedArtworkCellViewData('5', madameX.imageURL, 'Nov 7th', artworks[1]),
    new LikedArtworkCellViewData('6', starryNight.imageURL, 'Nov 6th', artworks[2]),
    new LikedArtworkCellViewData('7', medusasRaft.imageURL, 'Nov 5th', artworks[0]),
    new LikedArtworkCellViewData('8', madameX.imageURL, 'Nov 4th', artworks[1]),
    new LikedArtworkCellViewData('9', starryNight.imageURL, 'Nov 3rd', artworks[2]),
    new LikedArtworkCellViewData('10', medusasRaft.imageURL, 'Nov 2nd', artworks[0]),
    new LikedArtworkCellViewData('11', madameX.imageURL, 'Nov 1st', artworks[1]),
    new LikedArtworkCellViewData('12', starryNight.imageURL, 'Oct 31st', artworks[2]),
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
    const {bg} = useLocalSearchParams<{ bg?: string }>();
    const viewData = new UserProfileViewData(likedArt, settings, bg || null);
    return <UserProfileView viewData={viewData}/>;
}
