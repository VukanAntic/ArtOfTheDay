import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restGet} from '@/src/services/rest/restFetch';

type SeenImageDTO = {
    artworkId: number;
    seenAt: number;
};

const BASE = `${API_CONFIG.nextImageService}/api/next-image`;

export class RestNextImageClient implements INextImageClient {
    async getHistory(token: string): Promise<SeenImageData[]> {
        const res = await restGet<SeenImageDTO[]>(`${BASE}/history`, token);
        return res.map(dto => new SeenImageData(dto.artworkId, new Date(dto.seenAt)));
    }
}
