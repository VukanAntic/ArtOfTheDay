import {ControllerHost} from '@/src/mvc/ControllerHost';
import {splashScreenController} from '@/src/composition/AppCompositionRoot';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function SplashRoute() {
    return (
        <SafeArea>
            <ControllerHost controller={splashScreenController} />
        </SafeArea>
    );
}
