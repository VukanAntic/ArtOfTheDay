import {Text, TouchableOpacity, View} from "react-native";
import style from "@/src/components/UserProfile/UserProfileViewStyle";
import {router} from "expo-router";


export default function UserProfileView() {
    const goToHomePage = () => {
        router.push('/');
    };

    return (

        <View style={style.container}>
            <TouchableOpacity style={style.backButton} onPress={goToHomePage}>
                <Text style={style.backIcon}>‹</Text>
            </TouchableOpacity>
        </View>
    )
}