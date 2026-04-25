import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";

export default function SafeArea({children}: { children: React.ReactNode }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={{flex: 1, paddingTop: insets.top, backgroundColor: '#000'}}>
            {children}
        </View>
    );
}