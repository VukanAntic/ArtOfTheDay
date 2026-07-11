import {memo, useMemo, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import FeaturedArtworksListViewData from '@/src/components/FeaturedArtworksList/FeaturedArtworksListViewData';
import FeaturedArtworkView from '@/src/components/FeaturedArtwork/FeaturedArtworkView';

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

function FeaturedArtworksListView(data: FeaturedArtworksListViewData) {
    console.log('[FeaturedArtworksListView] render');
    const [containerSize, setContainerSize] = useState({width: 0, height: 0});
    const itemCount = data.artworkViews.length || 1;

    const onLayout = (e: any) => {
        const {width, height} = e.nativeEvent.layout;
        setContainerSize({width, height});
    };

    const onMomentumScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / containerSize.width);
        data.onIndexChanged(index);
    };

    const backgrounds = useMemo(() => {
        if (containerSize.width === 0) return null;
        return [...data.artworkViews].reverse().map((item, reversedIndex) => {
            const index = data.artworkViews.length - 1 - reversedIndex;
            const opacity = data.scrollX.interpolate({
                inputRange: [
                    index * containerSize.width,
                    (index + 1) * containerSize.width,
                ],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            });
            return (
                <Animated.Image
                    key={item.id}
                    source={{uri: item.imageURL, headers: imageHeaders}}
                    style={[
                        StyleSheet.absoluteFillObject,
                        {opacity, transform: [{scale: 1.5}]},
                    ]}
                    blurRadius={80}
                    resizeMode="cover"
                />
            );
        });
    }, [data.artworkViews, data.scrollX, containerSize.width]);

    return (
        <View style={{flex: 1}} onLayout={onLayout}>
            {containerSize.width > 0 && (
                <>
                    {backgrounds}

                    <Animated.FlatList
                        data={data.artworkViews}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={{flex: 1}}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: data.scrollX}}}],
                            {useNativeDriver: true},
                        )}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                        scrollEventThrottle={16}
                        initialNumToRender={itemCount}
                        maxToRenderPerBatch={itemCount}
                        windowSize={itemCount * 2 + 1}
                        removeClippedSubviews={false}
                        renderItem={({item}) => (
                            <View style={{
                                width: containerSize.width,
                                height: containerSize.height,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <FeaturedArtworkView
                                    id={item.id}
                                    title={item.title}
                                    imageURL={item.imageURL}
                                    receivedAt={item.receivedAt}
                                    description={item.description}
                                    artistName={item.artistName}
                                    onSeeMore={() => data.onSeeMore(item)}
                                />
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
}

export default memo(FeaturedArtworksListView);
