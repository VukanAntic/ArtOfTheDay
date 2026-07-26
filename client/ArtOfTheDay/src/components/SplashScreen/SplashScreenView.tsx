import {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, Easing, StatusBar} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewProps} from '@/src/mvc/ViewController';
import {AnimationCompleteIntent, SplashScreenIntent, SplashScreenViewData} from './SplashScreenViewData';
import style from './SplashScreenViewStyle';

export default function SplashScreenView({viewData, send}: ViewProps<SplashScreenViewData, SplashScreenIntent>) {
    const {top} = useSafeAreaInsets();

    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(20)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleY = useRef(new Animated.Value(12)).current;
    const spinnerOpacity = useRef(new Animated.Value(0)).current;

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
        ]).start(() => send(new AnimationCompleteIntent()));
    }, []);

    useEffect(() => {
        if (viewData.loading) {
            Animated.timing(spinnerOpacity, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start();
        }
    }, [viewData.loading]);

    return (
        <Animated.View style={[style.container, {marginTop: -top}]}>
            <StatusBar barStyle="light-content"/>
            <Animated.Text style={[style.title, {opacity: titleOpacity, transform: [{translateY: titleY}]}]}>
                INSPIRA
            </Animated.Text>
            <Animated.Text style={[style.subtitle, {opacity: subtitleOpacity, transform: [{translateY: subtitleY}]}]}>
                daily
            </Animated.Text>
            {viewData.loading && (
                <Animated.View style={[style.spinner, {opacity: spinnerOpacity}]}>
                    <ActivityIndicator color="rgba(255,255,255,0.7)"/>
                </Animated.View>
            )}
        </Animated.View>
    );
}
