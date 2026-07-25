import {ControllerHost} from '@/src/mvc/ControllerHost';
import {homeScreenController} from '@/src/composition/AppCompositionRoot';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function HomeRoute() {
    return (
        <SafeArea>
            <ControllerHost controller={homeScreenController} />
        </SafeArea>
    );
}
