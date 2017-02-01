/**
 * timer.component
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Timer } from "./timer";

@Component({
    selector: 'app-game-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})

export class GameTimerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() timer:Timer;

    private intervalId: number;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges( changes: SimpleChanges ): void {

        if (this.intervalId != null) {
            this.clearTimer();
        }

        if(changes['timer'] && changes['timer'].currentValue){
            let time_1 = new Date().getTime();
            this.intervalId = window.setInterval(() => {
                let currentTime = new Date().getTime();
                this.timer.Current = this.timer.Max + this.timer.Bonus - ((currentTime - time_1) / 1000);
                if (this.timer.Current <= 0) {
                    this.timer.Current = 0;
                    this.clearTimer();
                }

                if(this.timer.Stop) {
                    this.clearTimer();
                }
            }, 100);
        }

    }

    ngOnDestroy(): void {
        this.clearTimer();
    }

    getSeconds(): string {
        if (this.timer != null) {
            return Math.round(this.timer.Current) + "s";
        }
        else {
            return "?s";
        }
    }

    getPercentage(): string {
        if (this.timer != null) {
            return (this.timer.Current / this.timer.Max) * 100 + "%";
        }
        else {
            return "100%";
        }
    }

    clearTimer(): void {
        clearInterval(this.intervalId);
    }
}
