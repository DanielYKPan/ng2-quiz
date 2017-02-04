/**
 * game.component
 */

import { Component, OnInit } from '@angular/core';
import { INotifierOptions } from "ng2-yk-notifier";

@Component({
    selector: 'app-game',
    styleUrls: ['./game.component.scss'],
    templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

    options: INotifierOptions = {
        position: ['bottom', 'center'],
        timeDelay: 1000
    };

    constructor() {
    }

    ngOnInit() {
    }

}
