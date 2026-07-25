import {useCallback, useEffect, useSyncExternalStore} from 'react';
import {ViewController} from './ViewController';

type Props<TViewData, TIntent> = {
    controller: ViewController<TViewData, TIntent>;
};

export function ControllerHost<TViewData, TIntent>({controller}: Props<TViewData, TIntent>) {
    const viewData = useSyncExternalStore(controller.subscribe, controller.getSnapshot);

    useEffect(() => {
        controller.onMount();
        return () => controller.onUnmount();
    }, [controller]);

    const send = useCallback(
        (intent: TIntent) => controller.onMessage(intent),
        [controller],
    );

    const View = controller.View;
    return <View viewData={viewData} send={send} />;
}
