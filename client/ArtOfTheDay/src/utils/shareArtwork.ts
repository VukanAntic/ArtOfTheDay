import {Share} from 'react-native';
import {File, Paths} from 'expo-file-system';

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type ShareArtworkData = {
    title: string;
    artistName: string;
    imageURL: string;
};

export async function shareArtwork(data: ShareArtworkData): Promise<void> {
    const caption = `${data.title} by ${data.artistName}`;

    let fileUri: string | null = null;
    try {
        const destination = new File(Paths.cache, 'share-artwork.jpg');
        if (destination.exists) {
            destination.delete();
        }
        const file = await File.downloadFileAsync(data.imageURL, destination, {headers: imageHeaders});
        fileUri = file.uri;
    } catch (e) {
        console.warn('[shareArtwork] image download failed, sharing link only:', e);
    }

    try {
        if (fileUri) {
            await Share.share({message: caption, url: fileUri});
        } else {
            await Share.share({message: `${caption}\n${data.imageURL}`, url: data.imageURL});
        }
    } catch (e) {
        console.error('[shareArtwork] share failed:', e);
    }
}
