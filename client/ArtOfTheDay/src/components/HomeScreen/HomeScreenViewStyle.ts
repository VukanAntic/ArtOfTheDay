import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    headerText: {
        color: '#fff',
    },
    artworkListContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    dateListContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
});

export default style;