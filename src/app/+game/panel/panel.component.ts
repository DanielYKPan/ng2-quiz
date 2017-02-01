/**
 * panel.component
 */

import { Component, OnInit } from "@angular/core";
import { Timer } from "../timer/timer";

@Component({
    selector: 'app-game-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})

export class GamePanelComponent implements OnInit {

    timer: Timer;

    constructor() {
    }

    ngOnInit(): void {
    }

    test() {
        this.timer = new Timer(20, 20);
    }

    cancel() {
        this.timer.Stop = true;
    }

    add() {
        this.timer.Bonus += 5;
    }
}

