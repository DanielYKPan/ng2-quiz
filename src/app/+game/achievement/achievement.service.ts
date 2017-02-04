/**
 * achievement.service
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

export interface IAchievement {
    key: string;
    img: string;
    name: string;
    description: string;
    points: number;
    gained?: boolean;
}

@Injectable()
export class AchievementService {

    private url: string = 'assets/data/quiz/achievements.json';

    private achievements: Array<IAchievement>;

    constructor( private http: Http ) {
        this.http.get(this.url).map(res => res.json()).subscribe(
            data => this.achievements = data
        );
    }

    getAvailableAchievements(): Observable<IAchievement[]> {
        return this.http.get(this.url).map(res => res.json());
    }

    getAchievementByKey( key: string ): IAchievement {
        return this.achievements.find(( achievement: IAchievement ) => achievement.key == key);
    }

    pushAchievementToLocalStorage( achievement: IAchievement ): void {
        let tmpAchievements = this.getAchievementsFromLocalStorage();
        if (tmpAchievements.indexOf(achievement) == -1) {
            tmpAchievements.push(achievement);
            localStorage.setItem('achievements', JSON.stringify(tmpAchievements));
        }
    }

    getAchievementsFromLocalStorage(): IAchievement[] {
        return JSON.parse(localStorage.getItem('achievements') || "[]");
    }
}
