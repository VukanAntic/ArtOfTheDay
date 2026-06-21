import {useEffect, useRef} from 'react';
import {Animated, Easing, StatusBar} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSplashScreenController} from '@/src/hooks/useSplashScreenController';
import style from './SplashScreenViewStyle';

export default function SplashScreenView() {
    const {onAnimationComplete} = useSplashScreenController();
    const {top} = useSafeAreaInsets();

    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(20)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleY = useRef(new Animated.Value(12)).current;
    const screenOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 900,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(titleY, {
                    toValue: 0,
                    duration: 900,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(150),
            Animated.parallel([
                Animated.timing(subtitleOpacity, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(subtitleY, {
                    toValue: 0,
                    duration: 700,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(900),
            Animated.timing(screenOpacity, {
                toValue: 0,
                duration: 700,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start(() => onAnimationComplete());
    }, []);

    return (
        <Animated.View style={[style.container, {opacity: screenOpacity, marginTop: -top}]}>
            <StatusBar barStyle="light-content"/>
            <Animated.Text style={[style.title, {opacity: titleOpacity, transform: [{translateY: titleY}]}]}>
                INSPIRA
            </Animated.Text>
            <Animated.Text style={[style.subtitle, {opacity: subtitleOpacity, transform: [{translateY: subtitleY}]}]}>
                daily
            </Animated.Text>
        </Animated.View>
    );
}
