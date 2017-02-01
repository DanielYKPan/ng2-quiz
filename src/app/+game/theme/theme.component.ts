/**
 * theme.component
 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-game-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})

export class GameThemeComponent implements OnInit {
    constructor( private route: ActivatedRoute ) {
    }

    ngOnInit(): void {
        let theme = this.route.snapshot.params['theme'];
        console.log(theme);
    }
}
