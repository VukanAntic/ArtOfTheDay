import {useRef, useState} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import Reanimated from 'react-native-reanimated';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import FeaturedArtworksListView from "@/src/components/FeaturedArtworksList/FeaturedArtworksListView";
import FeaturedArtworkDateListView from "@/src/components/FeaturedArtworkDateList/FeaturedArtworkDateListView";
import ArtworkDetailView from "@/src/components/ArtworkDetail/ArtworkDetailView";
import {useArtworkExpandAnimation} from "@/src/hooks/useArtworkExpandAnimation";
import style from "@/src/components/HomeScreen/HomeScreenViewStyle";

const {width} = Dimensions.get('window');

const listData = [
    new FeaturedArtworkViewData(
        '1',
        "Raft of the Medusa",
        "1819.",
        'https://www.artic.edu/iiif/2/8f5f8f8f-8765-b04e-8ffa-f4379d9511f5/full/843,/0/default.jpg',
        new Date(),
        "The Raft of the Medusa depicts the harrowing aftermath of the wreck of the French naval frigate Méduse, which ran aground off the coast of Mauritania in 1816. One hundred and forty-seven crew members were set adrift on a makeshift raft; only fifteen survived. Géricault captures the survivors at the moment they first glimpse a ship on the horizon — a scene of raw desperation and fragile hope.",
        "Théodore Géricault",
        "1791. - 1824.",
        "Théodore Géricault was a pioneering French Romantic painter and lithographer whose brief life produced some of the most dramatic and visceral works of the 19th century. His unflinching depictions of suffering and mortality challenged the polished idealism of academic painting and laid the groundwork for the Realist movement that followed.",
    ),
    new FeaturedArtworkViewData(
        '2',
        "Madame X",
        "1884.",
        'https://www.artic.edu/iiif/2/5a047a1c-d36e-e88d-05e7-845d3936159b/full/843,/0/default.jpg',
        new Date(Date.now() - 86400000),
        "Madame X is a portrait of Virginie Amélie Avegno Gautreau, a Parisian socialite of American origin, renowned for her beauty and her unconventional choices in dress and manner. When Sargent exhibited the painting at the 1884 Paris Salon, the original pose — with one shoulder strap slipping off — caused a scandal. He later repainted it to the conventional position.",
        "John Singer Sargent",
        "1856. - 1925.",
        "John Singer Sargent was an American expatriate artist considered the leading portrait painter of his generation, celebrated for his technical virtuosity and his ability to capture the elegance and personality of his subjects. His fluid brushwork and mastery of light made him one of the most sought-after portraitists on both sides of the Atlantic.",
    ),
    new FeaturedArtworkViewData(
        '3',
        "Starry Night Over the Rhône",
        "1888.",
        'https://www.artic.edu/iiif/2/beeba230-022f-449a-a2fd-c0cf6c47d232/full/843,/0/default.jpg',
        new Date(Date.now() - 2 * 86400000),
        "Painted in Arles before van Gogh entered the Saint-Paul-de-Mausole asylum, this canvas shows the Rhône river at night, lit by the reflections of gas lamps lining the quay. It was one of several nocturne paintings he produced during this prolific and emotionally turbulent period, exploring colour and light as vehicles for inner feeling.",
        "Vincent van Gogh",
        "1853. - 1890.",
        "Vincent van Gogh was a Dutch Post-Impressionist painter who is among the most famous and influential figures in Western art. His distinctive style, characterised by bold colours, emotional honesty, and expressive brushwork, was largely unrecognised during his lifetime but proved enormously influential to 20th-century painting.",
    ),
];

export default function HomeScreenView() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedArtwork, setSelectedArtwork] = useState<FeaturedArtworkViewData | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const {cardStyle, homeUIOpacity, detailUIOpacity, infoPanelStyle, open, close} = useArtworkExpandAnimation();

    const handleSeeMore = (artwork: FeaturedArtworkViewData) => {
        setSelectedArtwork(artwork);
        open();
    };

    const handleClose = () => {
        close(() => setSelectedArtwork(null));
    };

    return (
        <View style={style.container}>
            <Reanimated.View style={[style.headerContainer, homeUIOpacity]}>
                <Text style={style.headerText}>Some header</Text>
            </Reanimated.View>

            <Reanimated.View style={[{flex: 1}, homeUIOpacity]}>
                <FeaturedArtworksListView
                    artworkViews={listData}
                    onIndexChanged={setActiveIndex}
                    scrollX={scrollX}
                    onSeeMore={handleSeeMore}
                />
            </Reanimated.View>

            <Reanimated.View style={[style.dateListContainer, homeUIOpacity]}>
                <FeaturedArtworkDateListView
                    dates={listData.map(item => item.receivedAt)}
                    scrollX={scrollX}
                    pageWidth={width}
                    activeIndex={activeIndex}
                />
            </Reanimated.View>

            {selectedArtwork && (
                <ArtworkDetailView
                    artwork={selectedArtwork}
                    cardStyle={cardStyle}
                    detailUIOpacity={detailUIOpacity}
                    infoPanelStyle={infoPanelStyle}
                    onClose={handleClose}
                />
            )}
        </View>
    );
}
