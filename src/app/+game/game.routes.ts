/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GameHomeComponent } from "./home";
import { GameChooserComponent } from "./chooser";
import { GameThemeComponent } from "./theme";

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GameHomeComponent},
            {path: 'chooser', component: GameChooserComponent},
            {path: 'chooser/:slug', component: GameThemeComponent},
        ]
    },
];
