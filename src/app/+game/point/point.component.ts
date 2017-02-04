/**
 * point.component
 */

import { Component, OnInit } from "@angular/core";
import { PointService } from "./point.service";

@Component({
    selector: 'quiz-points',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss']
})

export class QuizPointComponent implements OnInit {

    totalPoints: number;

    constructor(private pointService: PointService) {
    }

    ngOnInit(): void {
        this.totalPoints = this.pointService.getTotalPoints();
    }
}
