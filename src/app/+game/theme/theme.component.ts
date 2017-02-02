/**
 * theme.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizService, IQuiz } from "../service";
import { Subscription } from "rxjs";
import { Timer } from "../timer";

const themes = {
    'animals': 'violet',
    'brain-teasers': 'pink',
    'general': 'teal',
    'entertainment': 'yellow',
    'for-kids': 'blue',
    'literature': 'purple',
    'movies': 'olive',
    'science-technology': 'red',
    'sports': 'green',
    'video-games': 'orange',
};

@Component({
    selector: 'app-game-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})

export class GameThemeComponent implements OnInit, OnDestroy {

    quizs: IQuiz[];
    currentQuize: IQuiz;
    themeColor: string;
    q_num: number;
    timer: Timer;
    revealAnswer: boolean;

    private getQuestionsSub: Subscription;
    private q_amount: number = 10;
    private timeoutId: number;

    constructor( private route: ActivatedRoute,
                 private quizService: QuizService ) {
    }

    ngOnInit(): void {
        let slug = this.route.snapshot.params['slug'];
        this.q_num = 1;
        this.themeColor = themes[slug];
        this.getQuestionsSub = this.quizService.getQuestions(slug, this.q_amount)
            .subscribe(
                data => this.onQuestionsRetrieved(data)
            );
    }

    ngOnDestroy(): void {
        if (this.getQuestionsSub)
            this.getQuestionsSub.unsubscribe();

        if (this.timeoutId)
            this.clearTimer();
    }

    choiceCharCode( index: number ) {
        return String.fromCharCode(65 + index);
    }

    checkAnswer( choice?: string ): void {
        if (!this.revealAnswer) this.revealAnswer = true;

        if (choice && choice === this.currentQuize.answer)
            console.log("correct");
        else
            console.log("wrong");

        this.timer.Stop = true;

        this.timeoutId = window.setTimeout(() => {
            if (this.q_num < this.q_amount) {
                this.q_num += 1;
                this.process();
            }
        }, 1000);
    }

    private process() {
        if (this.timeoutId)
            this.clearTimer();
        this.revealAnswer = false;
        this.currentQuize = this.quizs[this.q_num - 1];
        this.timer = new Timer(20, 20);
    }

    private onQuestionsRetrieved( data: IQuiz[] ): void {
        this.quizs = data;
        this.process();
    }

    private clearTimer(): void {
        clearTimeout(this.timeoutId);
    }
}
