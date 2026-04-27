import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        zIndex: 10,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        color: '#fff',
        fontSize: 22,
        lineHeight: 26,
        marginLeft: -2,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#fff',
        fontSize: 13,
    },
    profileButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIcon: {
        color: '#fff',
        fontSize: 16,
    },
});
