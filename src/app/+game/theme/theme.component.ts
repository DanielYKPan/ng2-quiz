/**
 * theme.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizService, IQuiz } from "../service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-game-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})

export class GameThemeComponent implements OnInit, OnDestroy {

    quizs: IQuiz[];

    private getQuestionsSub: Subscription;
    private q_amount: number = 10;

    constructor( private route: ActivatedRoute,
                 private quizService: QuizService ) {
    }

    ngOnInit(): void {
        let theme = this.route.snapshot.params['theme'];

        this.getQuestionsSub = this.quizService.getQuestions(theme, this.q_amount)
            .subscribe(
                data => console.log(data)
            );
    }

    ngOnDestroy(): void {
        if(this.getQuestionsSub)
            this.getQuestionsSub.unsubscribe();
    }
}
