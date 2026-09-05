import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, ImageSourcePropType, useWindowDimensions, View} from 'react-native';
import {BackgroundCyclerViewData} from './BackgroundCyclerViewData';
import style from './BackgroundCyclerViewStyle';

const CYCLE_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 1500;

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

type Props = {
    viewData: BackgroundCyclerViewData;
};

export default function BackgroundCyclerView({viewData}: Props) {
    const {width, height} = useWindowDimensions();
    const images: ImageSourcePropType[] = useMemo(() => shuffle(viewData.images), [viewData.images]);
    const indexRef = useRef(0);
    const [imageA, setImageA] = useState<ImageSourcePropType | undefined>(images[0]);
    const [imageB, setImageB] = useState<ImageSourcePropType | undefined>(images.length > 1 ? images[1] : undefined);
    const bOpacity = useRef(new Animated.Value(0)).current;
    const aIsCurrentRef = useRef(true);

    useEffect(() => {
        if (images.length < 2) return;

        const interval = setInterval(() => {
            const nextIdx = (indexRef.current + 1) % images.length;
            indexRef.current = nextIdx;
            const afterIdx = (nextIdx + 1) % images.length;

            if (aIsCurrentRef.current) {
                Animated.timing(bOpacity, {
                    toValue: 1,
                    duration: FADE_DURATION_MS,
                    useNativeDriver: true,
                }).start(() => {
                    setImageA(images[afterIdx]);
                    aIsCurrentRef.current = false;
                });
            } else {
                Animated.timing(bOpacity, {
                    toValue: 0,
                    duration: FADE_DURATION_MS,
                    useNativeDriver: true,
                }).start(() => {
                    setImageB(images[afterIdx]);
                    aIsCurrentRef.current = true;
                });
            }
        }, CYCLE_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [images]);

    if (!imageA) return null;

    const imgStyle = {width, height: height - viewData.topOffset};

    return (
        <View style={[style.root, {top: viewData.topOffset}]}>
            <Animated.Image source={imageA} style={imgStyle} blurRadius={viewData.blurRadius} resizeMode="cover"/>
            {imageB && (
                <Animated.Image
                    source={imageB}
                    style={[imgStyle, style.fadeLayer, {opacity: bOpacity}]}
                    blurRadius={viewData.blurRadius}
                    resizeMode="cover"
                />
            )}
            <View style={[style.overlay, {backgroundColor: viewData.overlayColor}]}/>
        </View>
    );
}
