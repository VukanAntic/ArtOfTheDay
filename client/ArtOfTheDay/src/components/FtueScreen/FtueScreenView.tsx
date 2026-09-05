import {useCallback} from 'react';
import {ActivityIndicator, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewProps} from '@/src/mvc/ViewController';
import authBackgroundImages from '@/src/config/authBackgroundImages';
import BackgroundCyclerView from '@/src/components/BackgroundCycler/BackgroundCyclerView';
import {BackgroundCyclerViewData} from '@/src/components/BackgroundCycler/BackgroundCyclerViewData';
import FtueTimePickerView from '@/src/components/FtueTimePicker/FtueTimePickerView';
import FtueTimePresetsView from '@/src/components/FtueTimePresets/FtueTimePresetsView';
import FtueImageChoiceView from '@/src/components/FtueImageChoice/FtueImageChoiceView';
import {
    ContinueIntent,
    ExactTimeToggledIntent,
    FtueScreenIntent,
    FtueScreenViewData,
    TileSelectedIntent,
    TimeChangedIntent,
} from './FtueScreenViewData';
import style from './FtueScreenViewStyle';

const background = new BackgroundCyclerViewData(authBackgroundImages, 6, 'rgba(0,0,0,0.38)', 0);

export default function FtueScreenView({viewData, send}: ViewProps<FtueScreenViewData, FtueScreenIntent>) {
    const insets = useSafeAreaInsets();
    const disabled = !viewData.canContinue || viewData.submitting;
    const onSelectTile = useCallback((id: number) => send(new TileSelectedIntent(id)), [send]);

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <BackgroundCyclerView viewData={background}/>

            <View style={[style.header, {marginTop: insets.top}]}>
                <Text style={style.brand}>INSPIRA</Text>
                <Text style={style.brandSub}>daily</Text>
            </View>

            <View style={style.body}>
                {viewData.loading ? (
                    <View style={style.loading}>
                        <ActivityIndicator color="#ffffff"/>
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
                                <Text style={style.subtitle}>We&apos;ll bring you something new every day at this time.</Text>
                                {viewData.isExactTime ? (
                                    <>
                                        <FtueTimePickerView
                                            value={viewData.time}
                                            onChange={time => send(new TimeChangedIntent(time))}
                                        />
                                        <TouchableOpacity
                                            activeOpacity={0.85}
                                            style={style.timeModeToggle}
                                            onPress={() => send(new ExactTimeToggledIntent(false))}
                                        >
                                            <Text style={style.timeModeToggleText}>Back to suggested times</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <FtueTimePresetsView
                                            value={viewData.time}
                                            onSelect={time => send(new TimeChangedIntent(time))}
                                        />
                                        <TouchableOpacity
                                            activeOpacity={0.85}
                                            style={style.timeModeToggle}
                                            onPress={() => send(new ExactTimeToggledIntent(true))}
                                        >
                                            <Text style={style.timeModeToggleText}>Pick an exact time</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Text style={style.title}>Choose a painting that speaks to you</Text>
                                <Text style={style.subtitle}>Round {viewData.roundNumber} of {viewData.totalRounds}</Text>
                                <FtueImageChoiceView
                                    tiles={viewData.tiles}
                                    selectedId={viewData.selectedId}
                                    onSelect={onSelectTile}
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
                    <Text style={style.ctaText}>
                        {viewData.submitting ? 'Setting up…' : viewData.isLastPage ? 'Done' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
