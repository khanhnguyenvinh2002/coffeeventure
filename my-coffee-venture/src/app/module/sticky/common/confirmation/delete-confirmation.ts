import { Confirmation } from 'primeng/api';

export class DeleteConfirmation implements Confirmation {
    message?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;

    constructor() {
        const msg = 'Delete';
        const title = 'Delete confirmation';
        this.message = msg;
        this.header = title;
        this.icon = 'pi pi-exclamation-triangle';
    }
}
