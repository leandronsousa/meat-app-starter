import { NgModule } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/**
 * Modulo compartilhado onde fica os componentes da aplicacao que podem 
 * ser usado por outros componentes/modulos.
 * CommonModule necessario para diretivas ngIf, ngFor ....
 * Imports: Modulos necessarios para funcionar
 * exports: tudo que sera exportado caso queira usar o modulo
 */
@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent,
            CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule{

}
