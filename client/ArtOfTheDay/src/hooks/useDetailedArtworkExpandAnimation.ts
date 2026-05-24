import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
    Easing,
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 70;
// Must match titleArea height (70) + actionBar height (80) in the popup layout
const BOTTOM_AREA_HEIGHT = 150;

const OPEN_CONFIG = {duration: 350, easing: Easing.out(Easing.cubic)};
const CLOSE_CONFIG = {duration: 300, easing: Easing.in(Easing.cubic)};

export function useDetailedArtworkExpandAnimation(cardW: number, cardH: number) {
    const {width: screenW, height: screenH} = Dimensions.get('window');
    const {top: topInset, bottom: bottomInset} = useSafeAreaInsets();
    const progress = useSharedValue(0);

    const contentH = screenH - topInset;
    const cardStartLeft = (screenW - cardW) / 2;
    const cardStartTop = HEADER_HEIGHT + (contentH - HEADER_HEIGHT - (BOTTOM_AREA_HEIGHT + bottomInset) - cardH) / 2;

    const cardStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: interpolate(progress.value, [0, 1], [cardStartLeft, 0]),
        top: interpolate(progress.value, [0, 1], [cardStartTop, -topInset]),
        width: interpolate(progress.value, [0, 1], [cardW, screenW]),
        height: interpolate(progress.value, [0, 1], [cardH, screenH]),
        borderRadius: interpolate(progress.value, [0, 1], [20, 0]),
        overflow: 'hidden',
    }));

    const popupUIOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 0.4], [1, 0], Extrapolation.CLAMP),
    }));

    const backButtonOpacity = useAnimatedStyle(() => ({
        opacity: progress.value > 0.01 ? 1 : 0,
        pointerEvents: progress.value > 0.01 ? 'auto' : 'none',
    }));

    const infoPanelStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.7, 1], [0, 1], Extrapolation.CLAMP),
    }));

    const open = () => {
        progress.value = withTiming(1, OPEN_CONFIG);
    };

    const close = (onDone: () => void) => {
        progress.value = withTiming(0, CLOSE_CONFIG, () => runOnJS(onDone)());
    };

    return {cardStyle, popupUIOpacity, backButtonOpacity, infoPanelStyle, open, close};
}
