import {useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import FeaturedArtworksListViewData from "@/src/components/FeaturedArtworksList/FeaturedArtworksListViewData";
import FeaturedArtworkView from "@/src/components/FeaturedArtwork/FeaturedArtworkView";

const {width, height} = Dimensions.get('window');

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

export default function FeaturedArtworksListView(data: FeaturedArtworksListViewData) {
    const scrollX = useRef(new Animated.Value(0)).current;

    const onMomentumScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        data.onIndexChanged(index);
    };

    return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
            {data.artworkViews.map((item, index) => {
                const opacity = scrollX.interpolate({
                    inputRange: [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ],
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.Image
                        key={item.id}
                        source={{uri: item.imageURL, headers: imageHeaders}}
                        style={[StyleSheet.absoluteFillObject, {
                            opacity,
                            transform: [{scale: 1.5}],
                        }]}
                        blurRadius={80}
                        resizeMode="cover"
                    />
                );
            })}

            <Animated.FlatList
                data={data.artworkViews}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{flex: 1}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}
                onMomentumScrollEnd={onMomentumScrollEnd}
                scrollEventThrottle={16}
                renderItem={({item}) => (
                    <View style={{width, height, justifyContent: 'center', alignItems: 'center'}}>
                        <FeaturedArtworkView
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            imageURL={item.imageURL}
                            receivedAt={item.receivedAt}
                        />
                    </View>
                )}
            />
        </View>
    );
}