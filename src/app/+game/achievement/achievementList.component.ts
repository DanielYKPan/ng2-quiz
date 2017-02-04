/**
 * achievementList.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { AchievementService, IAchievement } from "./achievement.service";

@Component({
    selector: 'quiz-achievement-list',
    templateUrl: './achievementList.component.html',
    styleUrls: ['./achievementList.component.scss']
})

export class QuizAchievementListComponent implements OnInit, OnDestroy {

    achievements: IAchievement[];

    private getAvailableAchievementsSub;

    constructor( private achievementService: AchievementService ) {
    }

    ngOnInit(): void {
        let gained = this.achievementService.getAchievementsFromLocalStorage();
        this.getAvailableAchievementsSub = this.achievementService.getAvailableAchievements()
            .subscribe(( data ) => {
                this.achievements = data.map(( achievement ) => {
                    achievement.gained = gained.some(( gainedAchievement ) => gainedAchievement.key === achievement.key);
                    return achievement;
                });
            });
    }

    ngOnDestroy(): void {
        if (this.getAvailableAchievementsSub)
            this.getAvailableAchievementsSub.unsubscribe();
    }
}
