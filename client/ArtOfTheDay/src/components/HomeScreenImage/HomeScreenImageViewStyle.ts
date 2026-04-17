import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 3,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 500,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        padding: 12,
        paddingBottom: 4,
    },
    desc: {
        fontSize: 14,
        color: '#555',
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
});