/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GameHomeComponent } from "./home";
import { GameThemeComponent, QuizsResolve } from "./theme";
import { GameEndComponent } from "./end";
import { QuizChooserComponent } from "./quiz-chooser";

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GameHomeComponent},
            {path: 'chooser', component: QuizChooserComponent},
            {path: 'chooser/:slug', component: GameThemeComponent, resolve: {quizs: QuizsResolve}},
            {path: 'end', component: GameEndComponent},
        ]
    },
];
