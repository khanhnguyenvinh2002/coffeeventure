export class BaseResponse {
    id?: string;
    constructor(model?: any) {
        if (model) {
            Object.assign(this, model);
        }
    }

}
