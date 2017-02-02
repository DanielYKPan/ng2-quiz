/**
 * quiz.service
 */

import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

export interface IQuiz {
    answer: string;
    choices: string[];
    question: string;
}

@Injectable()
export class QuizService {

    private themeScore: number = 0;

    get ThemeScore(): number {
        return this.themeScore;
    }

    private q_amount: number = 10;

    get QAmount(): number {
        return this.q_amount;
    }

    constructor( private http: Http ) {
    }

    getQuestions( theme: string ): Observable<IQuiz[]> {
        let url = 'assets/data/quiz/' + theme + '.json';
        let all = this.http.get(url)
            .map(this.extractData);

        return all.map(data => _.sampleSize(data, this.q_amount));
    }

    addScore(): void {
        this.themeScore += 1;
    }

    resetScore(): void {
        this.themeScore = 0;
    }

    private extractData( res: Response ) {
        let body = res.json();
        return body || {};
    }
}
