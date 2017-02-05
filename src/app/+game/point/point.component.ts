/**
 * point.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { PointService } from "./point.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'quiz-points',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss']
})

export class QuizPointComponent implements OnInit, OnDestroy {

    totalPoints: number;

    private totalPointsChangedSub: Subscription;

    constructor( private pointService: PointService ) {
    }

    ngOnInit(): void {
        this.totalPoints = this.pointService.getTotalPoints();
        this.totalPointsChangedSub = this.pointService.totalPointsChange.subscribe(
            ( data: number ) => this.totalPoints = data
        );
    }

    ngOnDestroy(): void {
        if (this.totalPointsChangedSub)
            this.totalPointsChangedSub.unsubscribe();
    }
}
