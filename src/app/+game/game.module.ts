/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { routes } from './game.routes';
import { QuizService } from "./service";
import { GameComponent } from "./game.component";
import { GamePanelComponent } from "./panel";
import { GameTimerComponent } from "./timer";
import { GameHomeComponent } from "./home";
import { GameChooserComponent } from "./chooser";
import { GameThemeComponent } from "./theme";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHomeComponent,
        GameChooserComponent,
        GameThemeComponent,
        GamePanelComponent,
        GameTimerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        QuizService,
    ]
})
export class GameModule {
    public static routes = routes;
}
