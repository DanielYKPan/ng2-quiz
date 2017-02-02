/**
 * theme.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    q_amount: number;
    timer: Timer;
    revealAnswer: boolean;

    private getQuestionsSub: Subscription;
    private timeoutId: number;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private quizService: QuizService ) {
    }

    ngOnInit(): void {
        let slug = this.route.snapshot.params['slug'];
        this.q_num = 1;
        this.q_amount = this.quizService.QAmount;
        this.themeColor = themes[slug];
        this.quizService.resetScore();
        this.quizs = this.route.snapshot.data['quizs'];
        this.process();
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
            this.quizService.addScore();

        this.timer.Stop = true;

        this.timeoutId = window.setTimeout(() => {
            if (this.q_num < this.q_amount) {
                this.q_num += 1;
                this.process();
            }else {
                this.router.navigate(['/game/end']);
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

    private clearTimer(): void {
        clearTimeout(this.timeoutId);
    }
}
