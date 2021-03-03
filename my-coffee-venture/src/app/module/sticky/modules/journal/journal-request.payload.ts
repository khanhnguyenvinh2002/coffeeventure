import { RequestPayload } from "../../common/http/request-payload.model";

export class JournalRequestPayload extends RequestPayload {
    id: string;
    content: string;
    status: boolean;
}
