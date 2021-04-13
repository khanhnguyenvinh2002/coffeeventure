import { RequestPayload } from '../../common/http/request-payload.model';

export class UserRequestPayload extends RequestPayload {
    // orgId: string;
    email: string;
    roleId: string;
    excludeIds: string[];
    ids: string[];
    id: string;
    userName: string;
}
