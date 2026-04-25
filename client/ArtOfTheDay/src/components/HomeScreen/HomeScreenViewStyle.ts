import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
    },
    dateListContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    artworkListContainer: {
        flex: 1,
    },
    headerContainer: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

export default style;