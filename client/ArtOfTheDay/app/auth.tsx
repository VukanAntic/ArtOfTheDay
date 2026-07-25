import {ControllerHost} from '@/src/mvc/ControllerHost';
import {authScreenController} from '@/src/composition/AppCompositionRoot';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function AuthRoute() {
    return (
        <SafeArea>
            <ControllerHost controller={authScreenController} />
        </SafeArea>
    );
}
