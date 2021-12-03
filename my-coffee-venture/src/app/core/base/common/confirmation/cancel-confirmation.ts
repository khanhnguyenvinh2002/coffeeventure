import { Confirmation } from 'primeng/api';

export class CancelConfirmation implements Confirmation {
    message?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;

    constructor(content?: string) {
        const msg = content ? 'Cancel' : 'Cancel change';
        const title = 'Confirm';
        this.message = msg;
        this.header = title;
        this.icon = 'pi pi-exclamation-triangle';
    }
}
