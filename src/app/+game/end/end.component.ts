/**
 * end.component
 */

import { Component, OnInit } from "@angular/core";
import { QuizService, QuizStatus } from "../quiz-game";

@Component({
    selector: 'app-game-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.scss']
})

export class GameEndComponent implements OnInit {

    status: QuizStatus;

    constructor( private quizService: QuizService ) {
    }

    ngOnInit(): void {
        this.status = this.quizService.Status;
    }
}
