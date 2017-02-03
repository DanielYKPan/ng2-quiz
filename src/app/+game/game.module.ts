/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { routes } from './game.routes';
import { GameComponent } from "./game.component";
import { GameTimerComponent } from "./timer";
import { GameHomeComponent, GameHomeAchievementsComponent } from "./home";
import { GameEndComponent } from "./end";
import { QuizThemeService } from "./quiz-game";
import { QuizChooserComponent } from "./quiz-chooser";
import { QuizGameComponent, QuizsResolve, QuizService } from "./quiz-game";
import {
    AchievementEventService,
    ProfileService,
    AchievementService,
    CompletedGamesHandler,
    ProfileHandler
} from "./achievement";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHomeComponent,
        GameHomeAchievementsComponent,
        GameEndComponent,
        GameTimerComponent,
        QuizChooserComponent,
        QuizGameComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(routes),
        ToastModule.forRoot({
            toastLife: 2000,
            positionClass: "toast-bottom-center",
            animate: "fade"
        }),
    ],
    providers: [
        QuizService,
        QuizsResolve,
        QuizThemeService,

        AchievementEventService,
        AchievementService,
        ProfileService,

        ProfileHandler,
        CompletedGamesHandler,
    ]
})
export class GameModule {
    public static routes = routes;
}
