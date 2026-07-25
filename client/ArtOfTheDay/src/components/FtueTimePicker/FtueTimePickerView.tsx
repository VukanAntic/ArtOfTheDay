import {useEffect, useRef, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View} from 'react-native';
import {FtueTimePickerViewData, Period} from './FtueTimePickerViewData';
import style, {ITEM_HEIGHT} from './FtueTimePickerViewStyle';

const HOURS = Array.from({length: 12}, (_, i) => i + 1);
const MINUTES = [0, 15, 30, 45];
const PERIODS: Period[] = ['AM', 'PM'];

type WheelProps = {
    items: string[];
    selectedIndex: number;
    onIndexChange: (index: number) => void;
};

function Wheel({items, selectedIndex, onIndexChange}: WheelProps) {
    const ref = useRef<ScrollView>(null);
    const [active, setActive] = useState(selectedIndex);

    useEffect(() => {
        const id = setTimeout(
            () => ref.current?.scrollTo({y: selectedIndex * ITEM_HEIGHT, animated: false}),
            0,
        );
        return () => clearTimeout(id);
    }, []);

    const clampIndex = (offsetY: number) =>
        Math.max(0, Math.min(items.length - 1, Math.round(offsetY / ITEM_HEIGHT)));

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = clampIndex(e.nativeEvent.contentOffset.y);
        if (index !== active) {
            setActive(index);
        }
    };

    const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = clampIndex(e.nativeEvent.contentOffset.y);
        setActive(index);
        onIndexChange(index);
    };

    return (
        <ScrollView
            ref={ref}
            style={style.wheel}
            contentContainerStyle={style.wheelContent}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            scrollEventThrottle={16}
            onScroll={onScroll}
            onMomentumScrollEnd={onMomentumEnd}
        >
            {items.map((label, i) => (
                <View key={label} style={style.item}>
                    <Text style={[style.itemText, i === active && style.itemTextActive]}>{label}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

type Props = {
    value: FtueTimePickerViewData;
    onChange: (value: FtueTimePickerViewData) => void;
};

export default function FtueTimePickerView({value, onChange}: Props) {
    const hourIndex = Math.max(0, HOURS.indexOf(value.hours));
    const minuteIndex = Math.max(0, MINUTES.indexOf(value.minutes));
    const periodIndex = Math.max(0, PERIODS.indexOf(value.period));

    return (
        <View style={style.container}>
            <View style={style.selectionBand} />
            <Wheel
                items={HOURS.map(h => String(h))}
                selectedIndex={hourIndex}
                onIndexChange={i => onChange(new FtueTimePickerViewData(HOURS[i], value.minutes, value.period))}
            />
            <Text style={style.separator}>:</Text>
            <Wheel
                items={MINUTES.map(m => String(m).padStart(2, '0'))}
                selectedIndex={minuteIndex}
                onIndexChange={i => onChange(new FtueTimePickerViewData(value.hours, MINUTES[i], value.period))}
            />
            <Wheel
                items={PERIODS}
                selectedIndex={periodIndex}
                onIndexChange={i => onChange(new FtueTimePickerViewData(value.hours, value.minutes, PERIODS[i]))}
            />
        </View>
    );
}
