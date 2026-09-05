import {Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';
import {FtueTimePresetsViewData} from './FtueTimePresetsViewData';
import style, {ICON_COLOR, ICON_COLOR_SELECTED, ICON_SIZE} from './FtueTimePresetsViewStyle';

const PRESETS = FtueTimePresetsViewData.defaults();

function formatTime(time: FtueTimePickerViewData): string {
    return `${time.hours}:${String(time.minutes).padStart(2, '0')} ${time.period}`;
}

function isSameTime(a: FtueTimePickerViewData, b: FtueTimePickerViewData): boolean {
    return a.hours === b.hours && a.minutes === b.minutes && a.period === b.period;
}

type Props = {
    value: FtueTimePickerViewData;
    onSelect: (time: FtueTimePickerViewData) => void;
};

export default function FtueTimePresetsView({value, onSelect}: Props) {
    return (
        <View style={style.list}>
            {PRESETS.map(preset => {
                const selected = isSameTime(preset.time, value);
                return (
                    <TouchableOpacity
                        key={preset.label}
                        activeOpacity={0.85}
                        style={[style.card, selected && style.cardSelected]}
                        onPress={() => onSelect(preset.time)}
                    >
                        <Ionicons
                            name={preset.icon}
                            size={ICON_SIZE}
                            color={selected ? ICON_COLOR_SELECTED : ICON_COLOR}
                        />
                        <Text style={[style.label, selected && style.labelSelected]}>{preset.label}</Text>
                        <Text style={[style.time, selected && style.timeSelected]}>{formatTime(preset.time)}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
