import {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArtworkData} from '@/src/domain/ArtworkData';
import {ftueScreenController} from '@/src/composition/AppCompositionRoot';
import {FtueScreenViewData} from './FtueScreenViewData';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';
import {FtueImageChoiceViewData} from '@/src/components/FtueImageChoice/FtueImageChoiceViewData';
import FtueTimePickerView from '@/src/components/FtueTimePicker/FtueTimePickerView';
import FtueImageChoiceView from '@/src/components/FtueImageChoice/FtueImageChoiceView';
import style from './FtueScreenViewStyle';

export default function FtueScreenView() {
    const insets = useSafeAreaInsets();
    const [viewData, setViewData] = useState<FtueScreenViewData | null>(() => ftueScreenController.peekRounds());
    const [page, setPage] = useState(0);
    const [time, setTime] = useState(new FtueTimePickerViewData(9, 0, 'AM'));
    const [selected, setSelected] = useState<(ArtworkData | null)[]>(
        () => viewData ? new Array(viewData.rounds.length).fill(null) : [],
    );
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (viewData) return;
        ftueScreenController.loadRounds()
            .then(data => {
                setViewData(data);
                setSelected(new Array(data.rounds.length).fill(null));
            })
            .catch(e => console.error('[Ftue] loadRounds failed:', e));
    }, []);

    const rounds = viewData?.rounds ?? [];
    const totalRounds = rounds.length;
    const totalSteps = totalRounds + 1;
    const isTimePage = page === 0;
    const roundIndex = page - 1;

    const currentRound = isTimePage ? [] : rounds[roundIndex];
    const tiles = useMemo(
        () => currentRound.map(FtueImageChoiceViewData.fromArtwork),
        [currentRound],
    );
    const selectedId = isTimePage ? null : selected[roundIndex]?.id ?? null;
    const canContinue = isTimePage || selectedId !== null;
    const isLastPage = !isTimePage && roundIndex === totalRounds - 1;

    const onSelectTile = (id: number) => {
        const artwork = currentRound.find(a => a.id === id) ?? null;
        setSelected(prev => {
            const next = [...prev];
            next[roundIndex] = artwork;
            return next;
        });
    };

    const onContinue = () => {
        if (!canContinue || submitting) return;
        if (!isLastPage) {
            setPage(page + 1);
            return;
        }
        setSubmitting(true);
        const picks = selected.filter((a): a is ArtworkData => a !== null);
        const {hours24, minutes} = time.to24Hour();
        ftueScreenController.submit(hours24, minutes, picks)
            .catch(e => {
                console.error('[Ftue] submit failed:', e);
                setSubmitting(false);
            });
    };

    return (
        <View style={style.container}>
            {/*<StatusBar barStyle="dark-content"/>*/}
            {/*<View style={[style.header, {paddingTop: insets.top + 18}]}>*/}
            {/*    <Text style={style.brand}>INSPIRA</Text>*/}
            {/*    <Text style={style.brandSub}>daily</Text>*/}
            {/*</View>*/}

            <View style={[style.titleContainer, {paddingTop: insets.top + 5}]}>
                <Text style={style.title}>INSPIRA</Text>
                <Text style={style.subtitle}>daily</Text>
            </View>

            <View style={style.body}>
                {!viewData ? (
                    <View style={style.loading}>
                        <ActivityIndicator color="#1a1a1a"/>
                    </View>
                ) : (
                    <>
                        <View style={style.progress}>
                            {Array.from({length: totalSteps}, (_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        style.progressSegment,
                                        i < page && style.progressSegmentDone,
                                        i === page && style.progressSegmentActive,
                                    ]}
                                />
                            ))}
                        </View>

                        {isTimePage ? (
                            <>
                                <Text style={style.title}>When should we deliver your art?</Text>
                                <Text style={style.subtitle}>We'll bring you something new every day at this
                                    time.</Text>
                                <FtueTimePickerView value={time} onChange={setTime}/>
                            </>
                        ) : (
                            <>
                                <Text style={style.title}>Choose a painting that speaks to you</Text>
                                <Text style={style.subtitle}>Round {roundIndex + 1} of {totalRounds}</Text>
                                <FtueImageChoiceView tiles={tiles} selectedId={selectedId} onSelect={onSelectTile}/>
                            </>
                        )}
                    </>
                )}
            </View>

            <View style={[style.footer, {paddingBottom: insets.bottom + 16}]}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={[style.cta, (!canContinue || submitting) && style.ctaDisabled]}
                    onPress={onContinue}
                    disabled={!canContinue || submitting}
                >
                    <Text style={[style.ctaText, (!canContinue || submitting) && style.ctaTextDisabled]}>
                        {submitting ? 'Setting up…' : isLastPage ? 'Done' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
