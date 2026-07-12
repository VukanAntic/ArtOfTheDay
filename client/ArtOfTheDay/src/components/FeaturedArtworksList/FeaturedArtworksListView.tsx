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
    const [activeIndex, setActiveIndex] = useState(Math.max(0, data.artworkViews.length - 1));
    const itemCount = data.artworkViews.length || 1;

    const onLayout = (e: any) => {
        const {width, height} = e.nativeEvent.layout;
        setContainerSize({width, height});
    };

    const onMomentumScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / containerSize.width);
        setActiveIndex(index);
        data.onIndexChanged(index);
    };

    const backgrounds = useMemo(() => {
        if (containerSize.width === 0) return null;
        return data.artworkViews
            .map((item, index) => ({item, index}))
            .filter(({index}) => Math.abs(index - activeIndex) <= 1)
            .reverse()
            .map(({item, index}) => {
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
    }, [data.artworkViews, data.scrollX, containerSize.width, activeIndex]);

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
                        getItemLayout={(_, index) => ({length: containerSize.width, offset: containerSize.width * index, index})}
                        initialScrollIndex={itemCount - 1}
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
                                    isLiked={item.isLiked}
                                    onSeeMore={() => data.onSeeMore(item)}
                                    onPreferenceIntent={data.onPreferenceIntent}
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
