import {ActivityIndicator, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewProps} from '@/src/mvc/ViewController';
import {
    ContinueIntent,
    FtueScreenIntent,
    FtueScreenViewData,
    TileSelectedIntent,
    TimeChangedIntent,
} from './FtueScreenViewData';
import FtueTimePickerView from '@/src/components/FtueTimePicker/FtueTimePickerView';
import FtueImageChoiceView from '@/src/components/FtueImageChoice/FtueImageChoiceView';
import style from './FtueScreenViewStyle';

export default function FtueScreenView({viewData, send}: ViewProps<FtueScreenViewData, FtueScreenIntent>) {
    const insets = useSafeAreaInsets();
    const disabled = !viewData.canContinue || viewData.submitting;

    return (
        <View style={style.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={[style.header, {paddingTop: insets.top + 18}]}>
                <Text style={style.brand}>INSPIRA</Text>
                <Text style={style.brandSub}>daily</Text>
            </View>

            <View style={style.body}>
                {viewData.loading ? (
                    <View style={style.loading}>
                        <ActivityIndicator color="#1a1a1a" />
                    </View>
                ) : (
                    <>
                        <View style={style.progress}>
                            {Array.from({length: viewData.totalSteps}, (_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        style.progressSegment,
                                        i < viewData.currentStep && style.progressSegmentDone,
                                        i === viewData.currentStep && style.progressSegmentActive,
                                    ]}
                                />
                            ))}
                        </View>

                        {viewData.isTimePage ? (
                            <>
                                <Text style={style.title}>When should we deliver your art?</Text>
                                <Text style={style.subtitle}>We'll bring you something new every day at this time.</Text>
                                <FtueTimePickerView value={viewData.time} onChange={time => send(new TimeChangedIntent(time))} />
                            </>
                        ) : (
                            <>
                                <Text style={style.title}>Choose a painting that speaks to you</Text>
                                <Text style={style.subtitle}>Round {viewData.roundNumber} of {viewData.totalRounds}</Text>
                                <FtueImageChoiceView
                                    tiles={viewData.tiles}
                                    selectedId={viewData.selectedId}
                                    onSelect={id => send(new TileSelectedIntent(id))}
                                />
                            </>
                        )}
                    </>
                )}
            </View>

            <View style={[style.footer, {paddingBottom: insets.bottom + 16}]}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={[style.cta, disabled && style.ctaDisabled]}
                    onPress={() => send(new ContinueIntent())}
                    disabled={disabled}
                >
                    <Text style={[style.ctaText, disabled && style.ctaTextDisabled]}>
                        {viewData.submitting ? 'Setting up…' : viewData.isLastPage ? 'Done' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
