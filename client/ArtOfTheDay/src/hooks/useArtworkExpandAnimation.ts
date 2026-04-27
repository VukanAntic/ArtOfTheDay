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

const CARD_WIDTH = 268;
const CARD_HEIGHT = 536;
const CARD_BORDER_RADIUS = 125;
const HEADER_HEIGHT = 70;
const DATE_LIST_HEIGHT = 100;

const OPEN_CONFIG = {duration: 350, easing: Easing.out(Easing.cubic)};
const CLOSE_CONFIG = {duration: 300, easing: Easing.in(Easing.cubic)};

export function useArtworkExpandAnimation() {
    const {width: screenW, height: screenH} = Dimensions.get('window');
    const {top: topInset} = useSafeAreaInsets();
    const progress = useSharedValue(0);

    // Card position is relative to the safe-area content region (below the notch).
    // contentH excludes the notch so the card centering is correct on screen.
    const contentH = screenH - topInset;
    const cardStartLeft = (screenW - CARD_WIDTH) / 2;
    const cardStartTop = HEADER_HEIGHT + (contentH - HEADER_HEIGHT - DATE_LIST_HEIGHT - CARD_HEIGHT) / 2;

    const cardStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: interpolate(progress.value, [0, 1], [cardStartLeft, 0]),
        top: interpolate(progress.value, [0, 1], [cardStartTop, -topInset]),
        width: interpolate(progress.value, [0, 1], [CARD_WIDTH, screenW]),
        height: interpolate(progress.value, [0, 1], [CARD_HEIGHT, screenH]),
        borderRadius: interpolate(progress.value, [0, 1], [CARD_BORDER_RADIUS, 0]),
        overflow: 'hidden',
    }));

    const homeUIOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 0.4], [1, 0], Extrapolation.CLAMP),
    }));

    const detailUIOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP),
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

    return {cardStyle, homeUIOpacity, detailUIOpacity, infoPanelStyle, open, close};
}
