import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Confirmation } from 'primeng/api';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    constructor(
        private toastr: ToastrService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    public showSuccess(): void {
        const msg = "Success";
        const title = "Action success";
        this.toastr.success(msg, title,
            { timeOut: 4000 });
    }

    public showDeteleSuccess(): void {
        const msg = "Delete";
        const title = "Delete success";
        this.toastr.success(msg, title,
            { timeOut: 4000 });
    }

    public showError(message?: string): void {
        const msg = message ? message : "Error";
        const title = "Error occured";
        this.toastr.error(msg, title,
            { timeOut: 4000 });
    }

    public showWarning(message?: string): void {
        const msg = message ? message : "Warning";
        const title = "Warning";
        this.toastr.warning(msg, title,
            { timeOut: 4000 });
    }

    public showInfo(): void {
        const msg = "This is info";
        const title = "Info";
        this.toastr.info(msg, title,
            { timeOut: 4000 });
    }

    public showMessage(message: string): void {
        const msg = message;
        this.toastr.info(msg, '',
            { timeOut: 4000 });
    }

    public confirm(confirmation: Confirmation): void {
        // Check null confirmation
        if (!confirmation) {
            return;
        }

        // Get component reference
        const componentRef = this.appendComponentToBody(ConfirmationDialogComponent);

        // Create new private confirmation
        const _confirmation: Confirmation = { ...confirmation };
        _confirmation.key = 'f9de6625-3e71-4160-a8ec-aaf95767b500';
        _confirmation.message = confirmation.message;
        _confirmation.header = confirmation.header;
        _confirmation.accept = () => {
            if (confirmation.accept) { confirmation.accept(); }
            // Destroy component after close
            setTimeout(() => {
                this.appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            }, 200);
        };
        _confirmation.reject = () => {
            if (confirmation.reject) { confirmation.reject(); }
            // Destroy component after close
            setTimeout(() => {
                this.appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            }, 200);
        };

        // Perform confirm
        setTimeout(() => {
            componentRef.instance.confirmationService.confirm(_confirmation);
        }, 0);
    }

    /**
     * Append component to body
     */
    private appendComponentToBody(component: Type<ConfirmationDialogComponent>): ComponentRef<ConfirmationDialogComponent> {
        // 1. Create a component reference from the component
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.body.appendChild(domElem);

        // 5. Return component reference
        return componentRef;
    }
}
