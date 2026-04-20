import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');


export default StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: -(height * 0.09),
        right: -(width * 0.06),
        // transform: [{rotate: '-0deg'}],
    },
    likeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: (height * 0.04),
        right: (width * 0.155),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        // transform: [{rotate: '12deg'}],

    },
    seeMoreButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: (height * 0.088),
        left: (width * 0.255),
        // transform: [{rotate: '12deg'}],
    },
    iconText: {
        fontSize: 26,
        color: '#FFFFFF'
    },
    likedButtonText: {
        fontSize: 26,
        color: 'red'
    },
    notYetLikedButtonText: {
        fontSize: 26,
        color: '#FFFFFF'
    },

});