import {useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PreferenceSectionViewData from './PreferenceSectionViewData';
import style from './PreferenceSectionViewStyle';

type Props = {
    viewData: PreferenceSectionViewData;
    onRemove: (name: string) => void;
    onAdd: (name: string) => void;
};

export default function PreferenceSectionView({viewData, onRemove, onAdd}: Props) {
    const [input, setInput] = useState('');

    const available = viewData.all.filter(item => !viewData.selected.includes(item));

    const suggestions = input.trim().length === 0
        ? available
        : available.filter(item => item.toLowerCase().includes(input.toLowerCase()));

    const handleAdd = () => {
        const trimmed = input.trim();
        if (trimmed && !viewData.selected.includes(trimmed)) {
            onAdd(trimmed);
            setInput('');
        }
    };

    const handleSuggestionTap = (name: string) => {
        onAdd(name);
        setInput('');
    };

    return (
        <View style={style.container}>
            <Text style={style.title}>{viewData.title}</Text>

            {/* Selected chips */}
            {viewData.selected.length > 0 && (
                <View style={style.chipsWrap}>
                    {viewData.selected.map(name => (
                        <View key={name} style={style.chip}>
                            <Text style={style.chipText}>{name}</Text>
                            <TouchableOpacity
                                onPress={() => onRemove(name)}
                                hitSlop={{top: 8, bottom: 8, left: 4, right: 8}}
                            >
                                <Text style={style.chipRemove}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            {/* Text input + add button */}
            <View style={style.addRow}>
                <TextInput
                    style={style.addInput}
                    placeholder="Add more..."
                    placeholderTextColor="#aaa"
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleAdd}
                    returnKeyType="done"
                />
                <TouchableOpacity style={style.addButton} onPress={handleAdd}>
                    <Text style={style.addButtonText}>add</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontally scrollable suggestions from all[], filtered by input */}
            {suggestions.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={style.suggestionsContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {suggestions.map(name => (
                        <TouchableOpacity
                            key={name}
                            style={style.suggestionChip}
                            onPress={() => handleSuggestionTap(name)}
                            activeOpacity={0.65}
                        >
                            <Text style={style.suggestionText}>{name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
