import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    actionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        gap: 8,
    },
    actionBarDate: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    actionBarLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.45)',
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        lineHeight: 22,
    },
    cardsContainer: {
        paddingHorizontal: 10,
        gap: 4,
    },
    card: {
        backgroundColor: 'rgba(245,243,240,0.94)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        gap: 4,
    },
    label: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#111',
        textAlign: 'center',
    },
    year: {
        fontSize: 16,
        color: '#666',
    },
    description: {
        fontSize: 14,
        color: '#333',
        lineHeight: 22,
        textAlign: 'left',
        marginTop: 10,
        width: '100%',
    },
});
