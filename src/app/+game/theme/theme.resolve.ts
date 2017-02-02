/**
 * theme.resolve
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { QuizService, IQuiz } from "../service";

@Injectable()
export class QuizsResolve implements Resolve<IQuiz[]> {
    constructor( private quizService: QuizService ) {
    }

    resolve( route: ActivatedRouteSnapshot ): Observable<IQuiz[]>|Promise<IQuiz[]>|IQuiz[] {
        return this.quizService.getQuestions(route.params['slug']);
    }
}