import {ControllerHost} from '@/src/mvc/ControllerHost';
import {ftueScreenController} from '@/src/composition/AppCompositionRoot';

export default function FtueRoute() {
    return <ControllerHost controller={ftueScreenController} />;
}
