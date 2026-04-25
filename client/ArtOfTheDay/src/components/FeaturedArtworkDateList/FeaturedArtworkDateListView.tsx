import FeaturedArtworkDateListViewData from './FeaturedArtworkDateListViewData';
import {View} from "react-native";
import style from './FeaturedArtworkDateListViewStyle';
import FeaturedArtworkView from "@/src/components/FeaturedArtworkDate/FeaturedArtworkDateView";


export default function FeaturedArtworkDateListView(data: FeaturedArtworkDateListViewData) {
    return (
        <View style={style.container}>
            {data.dates.map((date, index) => (
                <View key={index} style={style.item}>
                    <FeaturedArtworkView
                        receivedAt={date}
                        isSelected={index === data.activeIndex}
                    />
                </View>
            ))}
        </View>
    );
}