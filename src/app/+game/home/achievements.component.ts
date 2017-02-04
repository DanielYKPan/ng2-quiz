/**
 * achievements.component
 */

import { Component, OnInit } from "@angular/core";
import { AchievementService, IAchievement } from "../achievement";

@Component({
    selector: 'app-game-home-achievements',
    templateUrl: './achievements.component.html',
    styleUrls: ['./achievements.component.scss']
})

export class GameHomeAchievementsComponent implements OnInit {

    achievements: IAchievement[];

    constructor( private achievementService: AchievementService ) {
    }

    ngOnInit(): void {
        this.achievements = this.achievementService.getAchievementsFromLocalStorage();
    }
}
