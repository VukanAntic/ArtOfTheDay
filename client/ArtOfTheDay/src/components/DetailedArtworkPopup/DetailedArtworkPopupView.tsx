import {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Reanimated, {runOnJS, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import DetailedArtworkPopupViewData from './DetailedArtworkPopupViewData';
import {useDetailedArtworkExpandAnimation} from '@/src/hooks/useDetailedArtworkExpandAnimation';
import ArtworkDetailInfoPanel from '@/src/components/ArtworkDetail/ArtworkDetailInfoPanel';
import s from './DetailedArtworkPopupViewStyle';
import DownloadImageButton from "@/src/components/DownloadImageButton/DownloadImageButtonView";

const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get('window');
const MAX_CARD_W = SCREEN_W * 0.85;
const MAX_CARD_H = 400;
const SPACER_HEIGHT = SCREEN_H * 0.55;
const CLOSE_THRESHOLD = -80;

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = {
    artwork: DetailedArtworkPopupViewData;
    onClose: () => void;
};

export default function DetailedArtworkPopupView({artwork, onClose}: Props) {
    const {bottom: bottomInset} = useSafeAreaInsets();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isExpanded, setIsExpanded] = useState(false);
    const isClosing = useSharedValue(false);

    const [cardW, setCardW] = useState(MAX_CARD_W);
    const [cardH, setCardH] = useState(MAX_CARD_H);
    useEffect(() => {
        Image.getSizeWithHeaders(artwork.imageURL, imageHeaders, (iw, ih) => {
            if (iw <= 0) return;
            let w = MAX_CARD_W;
            let h = Math.round(w * (ih / iw));
            if (h > MAX_CARD_H) {
                h = MAX_CARD_H;
                w = Math.round(h * (iw / ih));
            }
            setCardW(w);
            setCardH(h);
        });
    }, [artwork.imageURL]);

    const {cardStyle, popupUIOpacity, backButtonOpacity, infoPanelStyle, open, close} =
        useDetailedArtworkExpandAnimation(cardW, cardH);

    useEffect(() => {
        Animated.timing(fadeAnim, {toValue: 1, duration: 250, useNativeDriver: true}).start();
    }, []);

    const handleClose = () => {
        Animated.timing(fadeAnim, {toValue: 0, duration: 200, useNativeDriver: true}).start(() => onClose());
    };

    const handleExpand = () => {
        setIsExpanded(true);
        open();
    };

    const handleCollapseExpand = () => {
        close(() => {
            isClosing.value = false;
            setIsExpanded(false);
        });
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (event.contentOffset.y < CLOSE_THRESHOLD && !isClosing.value) {
                isClosing.value = true;
                runOnJS(handleCollapseExpand)();
            }
        },
    });


    return (
        <Animated.View style={[StyleSheet.absoluteFillObject, {opacity: fadeAnim}]}>
            {/* Blurred gradient background */}
            <Image
                source={{uri: artwork.imageURL, headers: imageHeaders}}
                style={[StyleSheet.absoluteFillObject, s.backgroundImage]}
                blurRadius={80}
                resizeMode="cover"
            />
            <Image
                source={{uri: artwork.imageURL, headers: imageHeaders}}
                style={[StyleSheet.absoluteFillObject, s.backgroundImage]}
                blurRadius={80}
                resizeMode="cover"
            />

            <Reanimated.View
                style={[StyleSheet.absoluteFillObject, popupUIOpacity]}
                pointerEvents={isExpanded ? 'none' : 'box-none'}
            >
                <View style={s.header}>
                    <TouchableOpacity style={s.backButton} onPress={handleClose}>
                        <Text style={s.backIcon}>‹</Text>
                    </TouchableOpacity>
                    <View style={s.titleContainer}>
                        <Text style={s.title}>INSPIRA</Text>
                        <Text style={s.subtitle}>daily</Text>
                    </View>
                    <View style={s.headerSpacer}/>
                </View>

                <View style={s.cardAreaFlex}/>
                <View style={{width: cardW, height: cardH}}/>

                <View style={s.titleArea}>
                    <Text style={s.artistName}>{artwork.artistName}</Text>
                    <Text style={s.artworkTitle}>{artwork.title}</Text>
                </View>

                <View style={s.cardAreaFlex}/>

                <View style={s.actionBar}>
                    <DownloadImageButton data={artwork}></DownloadImageButton>
                    <View style={s.actionBarLine}/>
                    <TouchableOpacity style={s.actionButton} onPress={handleExpand}>
                        <Image source={require('@/assets/images/icons/Shrink.png')}></Image>
                    </TouchableOpacity>
                    <View style={s.actionBarLine}/>
                    <TouchableOpacity style={s.actionButton}>
                        <Text style={s.actionButtonText}>{artwork.isImageLiked ? '♥' : '♡'}</Text>
                    </TouchableOpacity>
                    <View style={s.actionBarLine}/>
                    <TouchableOpacity style={s.actionButton}>
                        <Image source={require('@/assets/images/icons/Share_Android.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{height: bottomInset}}/>
            </Reanimated.View>

            {/* Artwork card — dimensions match the painting's real aspect ratio */}
            <Reanimated.Image
                source={{uri: artwork.imageURL, headers: imageHeaders}}
                style={cardStyle}
                resizeMode="cover"
            />

            {/* Detail info panel — fades in as card expands */}
            <View style={StyleSheet.absoluteFillObject} pointerEvents={isExpanded ? 'auto' : 'none'}>
                <Reanimated.ScrollView
                    style={[StyleSheet.absoluteFillObject, infoPanelStyle]}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                    contentContainerStyle={{paddingBottom: 48}}
                >
                    <View style={{height: SPACER_HEIGHT}}/>
                    <ArtworkDetailInfoPanel artwork={artwork}/>
                </Reanimated.ScrollView>
            </View>

            {/* Expanded-state back button — no profile button */}
            <View
                style={StyleSheet.absoluteFillObject}
                pointerEvents={isExpanded ? 'box-none' : 'none'}
            >
                <Reanimated.View style={[s.header, backButtonOpacity]}>
                    <TouchableOpacity style={s.backButton} onPress={handleCollapseExpand}>
                        <Text style={s.backIcon}>‹</Text>
                    </TouchableOpacity>
                    <View style={s.titleContainer}>
                        <Text style={s.title}>INSPIRA</Text>
                        <Text style={s.subtitle}>daily</Text>
                    </View>
                    <View style={s.headerSpacer}/>
                </Reanimated.View>
            </View>
        </Animated.View>
    );
}
