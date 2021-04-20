import { Confirmation } from 'primeng/api';

export class RejectConfirmation implements Confirmation {
    message?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;

    constructor() {
        const msg = 'Reject';
        const title = 'Reject confirmation';
        this.message = msg;
        this.header = title;
        this.icon = 'pi pi-exclamation-triangle';
    }
}
