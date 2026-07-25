import {ControllerHost} from '@/src/mvc/ControllerHost';
import {userProfileController} from '@/src/composition/AppCompositionRoot';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function ProfileRoute() {
    return (
        <SafeArea>
            <ControllerHost controller={userProfileController} />
        </SafeArea>
    );
}
