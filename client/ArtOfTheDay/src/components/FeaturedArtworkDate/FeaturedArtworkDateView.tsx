import {Text, View} from "react-native";
import FeaturedArtworkDateViewData from "@/src/components/FeaturedArtworkDate/FeaturedArtworkDateViewData";
import style from './FeaturedArtworkDateViewStyle';

export default function FeaturedArtworkDateView(data: FeaturedArtworkDateViewData) {
    if (data.isSelected) {
        const label = new Date(data.receivedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });

        return <Text style={style.dateText}>{label}</Text>;
    }

    return <View style={style.dot}/>;
}