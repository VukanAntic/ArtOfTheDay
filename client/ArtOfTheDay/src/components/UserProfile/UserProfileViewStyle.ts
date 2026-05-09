import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#000',  // visible while image loads / if no image
    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
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
        fontFamily: 'Lato-Bold',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: 13,
        fontFamily: 'Lato-Regular',
    },
    headerRight: {
        width: 36,
    },
    pager: {
        flex: 1,
    },
});
