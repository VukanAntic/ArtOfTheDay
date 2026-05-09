import {Dimensions, TouchableOpacity} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import type {SharedValue} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {Ionicons} from '@expo/vector-icons';
import style, {
    BUTTON_WIDTH,
    CURVE_DIP,
    ICON_Y,
    INDICATOR_HEIGHT,
    LEFT_ICON_X,
    RIGHT_ICON_X,
} from './CurvedTabIndicatorViewStyle';

type Props = {
    scrollProgress: SharedValue<number>;
    onTabPress: (index: number) => void;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Cubic bezier control points — gentle downward arc between icon centers
const P0X = LEFT_ICON_X,           P0Y = ICON_Y;
const P1X = SCREEN_WIDTH * 0.38,   P1Y = ICON_Y + CURVE_DIP;
const P2X = SCREEN_WIDTH * 0.62,   P2Y = ICON_Y + CURVE_DIP;
const P3X = RIGHT_ICON_X,          P3Y = ICON_Y;

const PATH_D = `M ${P0X} ${P0Y} C ${P1X} ${P1Y} ${P2X} ${P2Y} ${P3X} ${P3Y}`;

export default function CurvedTabIndicatorView({scrollProgress, onTabPress}: Props) {
    // Evaluate cubic bezier at t = scrollProgress, translate circle from P0 to that point
    const circleStyle = useAnimatedStyle(() => {
        const t = scrollProgress.value;
        const mt = 1 - t;
        const x = mt * mt * mt * P0X + 3 * mt * mt * t * P1X + 3 * mt * t * t * P2X + t * t * t * P3X;
        const y = mt * mt * mt * P0Y + 3 * mt * mt * t * P1Y + 3 * mt * t * t * P2Y + t * t * t * P3Y;
        return {
            transform: [
                {translateX: x - P0X},
                {translateY: y - P0Y},
            ],
        };
    });

    const leftIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollProgress.value, [0, 0.6], [1, 0.28], Extrapolation.CLAMP),
    }));

    const rightIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollProgress.value, [0.4, 1], [0.28, 1], Extrapolation.CLAMP),
    }));

    return (
        <Animated.View style={style.container}>
            {/* Static bezier curve line */}
            <Svg width={SCREEN_WIDTH} height={INDICATOR_HEIGHT} style={style.svg}>
                <Path d={PATH_D} stroke="#c4c2be" strokeWidth={1.5} fill="none"/>
            </Svg>

            {/* Moving white circle — slides along the bezier path */}
            <Animated.View style={[style.movingCircle, circleStyle]}/>

            {/* Left tab: Liked Art */}
            <TouchableOpacity
                style={[style.iconButton, {left: LEFT_ICON_X - BUTTON_WIDTH / 2}]}
                onPress={() => onTabPress(0)}
                activeOpacity={0.75}
            >
                <Animated.View style={[style.iconWrapper, leftIconStyle]}>
                    <Ionicons name="heart" size={22} color="#1a1a1a"/>
                </Animated.View>
                <Animated.Text style={[style.iconLabel, leftIconStyle]}>
                    Liked art
                </Animated.Text>
            </TouchableOpacity>

            {/* Right tab: Settings */}
            <TouchableOpacity
                style={[style.iconButton, {left: RIGHT_ICON_X - BUTTON_WIDTH / 2}]}
                onPress={() => onTabPress(1)}
                activeOpacity={0.75}
            >
                <Animated.View style={[style.iconWrapper, rightIconStyle]}>
                    <Ionicons name="settings-sharp" size={22} color="#1a1a1a"/>
                </Animated.View>
                <Animated.Text style={[style.iconLabel, rightIconStyle]}>
                    Settings
                </Animated.Text>
            </TouchableOpacity>
        </Animated.View>
    );
}
