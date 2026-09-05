import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    fadeLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});
