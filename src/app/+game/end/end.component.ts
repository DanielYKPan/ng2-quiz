/**
 * end.component
 */

import { Component, OnInit } from "@angular/core";
import { QuizService } from "../quiz-game";

@Component({
    selector: 'app-game-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.scss']
})

export class GameEndComponent implements OnInit {

    themeScore: number;
    qAmount: number;

    constructor( private quizService: QuizService ) {
    }

    ngOnInit(): void {
        this.themeScore = 0;
        this.qAmount = this.quizService.QAmount;
    }
}
