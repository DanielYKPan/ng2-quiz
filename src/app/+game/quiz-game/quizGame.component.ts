/**
 * quizGame.component
 */

import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { Subscription } from "rxjs";
import { Timer } from "../timer";
import { QuizTheme } from "./quizTheme";
import { QuizThemeService } from "./quizTheme.service";
import { QuizStatus } from "./quizStatus";
import { AnswerStatus } from "./answerStatus";
import { AchievementEventService } from "../achievement";
import { IQuiz, QuizService } from "./quiz.service";

@Component({
    selector: 'app-quiz-game',
    templateUrl: './quizGame.component.html',
    styleUrls: ['./quizGame.component.scss']
})

export class QuizGameComponent implements OnInit {
    quizs: IQuiz[];
    currentQuize: IQuiz;
    theme: QuizTheme;
    q_num: number;
    q_amount: number;
    timer: Timer;
    revealAnswer: boolean;

    private status: QuizStatus;

    private getQuestionsSub: Subscription;
    private timeoutId: number;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private vcr: ViewContainerRef,
                 private toastr: ToastsManager,
                 private quizService: QuizService,
                 private themeService: QuizThemeService,
                 private eventService: AchievementEventService ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void {
        let slug = this.route.snapshot.params['slug'];
        this.quizs = this.route.snapshot.data['quizs'];
        this.q_num = 1;
        this.q_amount = this.quizService.QAmount;
        this.theme = this.themeService.findOne(slug);
        this.status = new QuizStatus(this.theme, this.q_amount);
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

        this.handleAnswer(choice);

        this.timer.Stop = true;

        this.timeoutId = window.setTimeout(() => {
            if (this.q_num < this.q_amount) {
                this.q_num += 1;
                this.process();
            } else {
                this.eventService.completedEvent.emit(this.status);
                this.router.navigate(['/game/end']);
            }
        }, 1000);
    }

    private handleAnswer( choice: string ) {
        let answerStatus;
        if (choice == null) {
            this.toastr.error("Too bad, you didn't answer the question in time.", 'Oops!');
            answerStatus = new AnswerStatus(false, this.theme);
            this.status.wrong += 1;
        } else if (this.currentQuize.answer === choice) {
            this.toastr.success('You are awesome!', 'Correct!');
            answerStatus = new AnswerStatus(true, this.theme);
            this.status.correct += 1;
        } else {
            this.toastr.error('That was not the correct answer.', 'Oops!');
            answerStatus = new AnswerStatus(false, this.theme);
            this.status.wrong += 1;
        }
        this.eventService.answeredEvent.emit(answerStatus);
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
