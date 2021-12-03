import { Confirmation } from 'primeng/api';

export class CustomConfirmation implements Confirmation {
    message?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;

    constructor(content: string) {
        const msg = content;
        const title = 'Warning';
        this.message = msg;
        this.header = title;
        this.icon = 'pi pi-exclamation-triangle';
    }
}
