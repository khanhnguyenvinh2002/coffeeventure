import { RequestPayload } from '../../common/http/request-payload.model';

export class UserShopRequestPayload extends RequestPayload {
    // orgId: string;
    shopId: string;
    userId: string;
    userIds: string[];
    id: string;
}
