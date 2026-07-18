import {Alert, Image, TouchableOpacity} from 'react-native';
import {File, Paths} from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import s from "./DownloadImageButtonViewStyle";
import DownloadImageButtonViewData from "@/src/components/DownloadImageButton/DownloadImageButtonViewData";

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = {
    data: DownloadImageButtonViewData;
};

export default function DownloadImageButton({data}: Props) {
    const downloadImage = async () => {
        try {
            const {status} = await MediaLibrary.requestPermissionsAsync(true);
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please allow access to save photos.');
                return;
            }

            const destination = new File(Paths.cache, 'downloaded-image.jpg');
            if (destination.exists) {
                destination.delete();
            }
            const output = await File.downloadFileAsync(data.imageURL, destination, {headers: imageHeaders});

            await MediaLibrary.saveToLibraryAsync(output.uri);

            Alert.alert('Saved', 'Image saved to your photos.');
        } catch (e) {
            Alert.alert('Error', 'Failed to download image.');
            console.error(e);
        }
    };


    return <TouchableOpacity style={s.actionButton} onPress={downloadImage}>
        <Image source={require('@/assets/images/icons/Cloud_Download.png')}></Image>
    </TouchableOpacity>;
}
