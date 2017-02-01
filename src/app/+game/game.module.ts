/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './game.routes';
import { GameComponent } from "./game.component";
import { GamePanelComponent } from "./panel";
import { GameTimerComponent } from "./timer";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GamePanelComponent,
        GameTimerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class GameModule {
    public static routes = routes;
}
