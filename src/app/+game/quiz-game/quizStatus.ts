/**
 * quizStatus
 */
import { QuizTheme } from "./quizTheme";

export class QuizStatus {
    total: number;
    theme: QuizTheme;
    correct: number;
    wrong: number;

    constructor( theme: QuizTheme, total?: number, correct?: number, wrong?: number ) {
        this.theme = theme;
        this.total = total || 0;
        this.correct = correct || 0;
        this.wrong = wrong || 0;
    }
}
