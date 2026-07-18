import {Alert, Image, TouchableOpacity} from 'react-native';
import {File, Paths} from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import s from "./DownloadImageButtonViewStyle";
import DownloadImageButtonViewData from "@/src/components/DownloadImageButton/DownloadImageButtonViewData";

type Props = {
    data: DownloadImageButtonViewData;
};

export default function DownloadImageButton({data}: Props) {
    const downloadImage = async () => {
        try {
            const {status} = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please allow access to save photos.');
                return;
            }

            const destination = new File(Paths.document, 'downloaded-image.jpg');
            const output = await File.downloadFileAsync(data.imageURL, destination);

            const asset = await MediaLibrary.createAssetAsync(output.uri);
            const album = await MediaLibrary.getAlbumAsync('Download');
            if (album) {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            } else {
                await MediaLibrary.createAlbumAsync('Download', asset, false);
            }

            Alert.alert('Saved', 'Image saved to your gallery.');
        } catch (e) {
            Alert.alert('Error', 'Failed to download image.');
            console.error(e);
        }
    };


    return <TouchableOpacity style={s.actionButton} onPress={downloadImage}>
        <Image source={require('@/assets/images/icons/Cloud_Download.png')}></Image>
    </TouchableOpacity>;
}