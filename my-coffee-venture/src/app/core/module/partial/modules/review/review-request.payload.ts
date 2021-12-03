import { RequestPayload } from '../../../../base/common/http/request-payload.model';

export class ReviewRequestPayload extends RequestPayload {
    id: string;
    content: string;
    status: number;
    rating: number;
    reviewId: string;
    shopId: string;
    createdBy: string;
}
