import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f2f1ee',
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
        backgroundColor: 'rgba(0,0,0,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        color: '#1a1a1a',
        fontSize: 22,
        lineHeight: 26,
        marginLeft: -2,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#1a1a1a',
        fontSize: 18,
        fontStyle: 'italic',
        fontFamily: 'Lato-Bold',
    },
    subtitle: {
        color: '#666',
        fontSize: 13,
        fontFamily: 'Lato-Regular',
    },
    // Spacer to mirror back button and keep title centred
    headerRight: {
        width: 36,
    },
    pager: {
        flex: 1,
    },
});
