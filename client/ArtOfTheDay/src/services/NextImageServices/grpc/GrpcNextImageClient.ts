import {createClient} from '@connectrpc/connect';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';
import {NextImageGrpcService} from '@/src/services/grpc/gen/next_image_pb';
import {grpcTransport} from '@/src/services/grpc/grpcTransport';

export class GrpcNextImageClient implements INextImageClient {
    private readonly client = createClient(NextImageGrpcService, grpcTransport);

    async getHistory(): Promise<SeenImageData[]> {
        const res = await this.client.getHistory({});
        return res.seenImages.map(
            s => new SeenImageData(Number(s.artworkId), new Date(Number(s.seenAt))),
        );
    }

    async setPreferredTime(command: SetPreferredTimeCommand): Promise<void> {
        await this.client.setPreferredTime({
            preferredTimeInHours: command.preferredTimeInHours,
            preferredTimeInMinutes: command.preferredTimeInMinutes,
            timeZoneId: command.timeZoneId,
        });
    }
}
