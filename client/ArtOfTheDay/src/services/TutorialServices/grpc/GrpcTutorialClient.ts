import {createClient} from '@connectrpc/connect';
import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';
import {TutorialGrpcService} from '@/src/services/grpc/gen/tutorial_pb';
import {grpcTransport} from '@/src/services/grpc/grpcTransport';

export class GrpcTutorialClient implements ITutorialClient {
    private readonly client = createClient(TutorialGrpcService, grpcTransport);

    async ftueComplete(command: FtueCompleteCommand): Promise<void> {
        await this.client.ftueComplete({
            artworkIds: command.artworkIds.map(BigInt),
            genreIds: command.genreIds,
            artistIds: command.artistIds.map(BigInt),
        });
    }
}
