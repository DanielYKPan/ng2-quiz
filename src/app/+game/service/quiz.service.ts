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

    constructor( private http: Http ) {
    }

    getQuestions( theme: string, num?: number ): Observable<IQuiz[]> {
        let url = 'assets/data/quiz/' + theme + '.json';
        let all = this.http.get(url)
            .map(this.extractData);

        if (num) {
            return all.map(data => _.sampleSize(data, num));
        } else {
            return all;
        }
    }

    private extractData( res: Response ) {
        let body = res.json();
        return body || {};
    }
}
