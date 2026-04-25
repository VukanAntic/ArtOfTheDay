import {Animated, Dimensions, View} from 'react-native';
import FeaturedArtworkDateListViewData from './FeaturedArtworkDateListViewData';
import style, {ITEM_WIDTH} from './FeaturedArtworkDateListViewStyle';

const screenWidth = Dimensions.get('window').width;

export default function FeaturedArtworkDateListView(data: FeaturedArtworkDateListViewData) {
    const translateX = data.scrollX.interpolate({
        inputRange: data.dates.map((_, i) => i * data.pageWidth),
        outputRange: data.dates.map((_, i) =>
            screenWidth / 2 - (i * ITEM_WIDTH + ITEM_WIDTH / 2)
        ),
    });

    return (
        <View style={style.container}>
            <Animated.View style={[style.row, {transform: [{translateX}]}]}>
                {data.dates.map((date, index) => {
                    const isActive = index === data.activeIndex;

                    const label = new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    });

                    return (
                        <View key={index} style={style.item}>
                            {isActive ? (
                                <Animated.Text style={style.dateText}>
                                    {label}
                                </Animated.Text>
                            ) : (
                                <View style={style.dot}/>
                            )}
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );
}