import { RequestPayload } from '../../common/http/request-payload.model';

export class ReviewRequestPayload extends RequestPayload {
    id: string;
    content: string;
    status: boolean;
    rating: number;
    shopId: string;
}
