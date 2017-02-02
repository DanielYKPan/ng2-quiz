/**
 * achievement.service
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

export interface IAchievement {
    key: string;
    img: string;
    name: string;
    description: string;
    points: number;
}

@Injectable()
export class AchievementService {

    private url: string = 'app/+game/achievement/achievements.json';

    private achievements: Array<IAchievement>;

    constructor( private http: Http ) {
        this.http.get(this.url).map(res => res.json()).subscribe(
            data => this.achievements = data
        );
    }

    getAchievementByKey( key: string ): IAchievement {
        return this.achievements.find(( achievement: IAchievement ) => achievement.key == key);
    }

    pushAchievementToLocalStorage( achievement: IAchievement ): void {
        let tmpAchievements = this.getAchievementsFromLocalStorage();
        if (this.achievements.indexOf(achievement) == -1) {
            tmpAchievements.push(achievement);
            localStorage.setItem('achievements', JSON.stringify(tmpAchievements));
        }
    }

    private getAchievementsFromLocalStorage(): IAchievement[] {
        return JSON.parse(localStorage.getItem('achievements') || "[]");
    }
}
