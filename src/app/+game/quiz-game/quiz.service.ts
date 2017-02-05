/**
 * quiz.service
 */

import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { QuizStatus } from "./quizStatus";

export interface IQuiz {
    answer: string;
    choices: string[];
    question: string;
}

@Injectable()
export class QuizService {

    private q_amount: number = 10;

    get QAmount(): number {
        return this.q_amount;
    }

    private status: QuizStatus;

    get Status(): QuizStatus {
        return this.status;
    }

    set Status( value: QuizStatus ) {
        this.status = value;
    }

    constructor( private http: Http ) {
    }

    getQuestions( theme: string ): Observable<IQuiz[]> {
        let url = 'assets/data/quiz/' + theme + '.json';
        let all = this.http.get(url)
            .map(this.extractData);

        return all.map(data => _.sampleSize(data, this.q_amount));
    }


    private extractData( res: Response ) {
        let body = res.json();
        return body || {};
    }
}
