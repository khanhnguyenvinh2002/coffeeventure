import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTimeComponent } from './input-time.component';


@NgModule({
    declarations: [
        InputTimeComponent
    ],
    exports: [
        InputTimeComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        InputMaskModule
    ],
    providers: []
})
export class InputTimeModule {
}