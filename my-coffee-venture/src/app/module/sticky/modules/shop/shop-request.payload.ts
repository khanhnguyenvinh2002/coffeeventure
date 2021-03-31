import { RequestPayload } from '../../common/http/request-payload.model';

export class ShopRequestPayload extends RequestPayload {
    // orgId: string;
    categoryIds: string[];
    districts: string[];
    cities: string[];
    minPrice: number;
    maxPrice: number;
    name: string;
}
