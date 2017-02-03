/**
 * completedGamesHandler
 */
import { Injectable } from "@angular/core";
import { ProfileHandler } from "./profileHandler";
import { AchievementService, IAchievement } from "../../achievement.service";
import { Profile } from "../../profile/profile";

@Injectable()
export class CompletedGamesHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService ) {
        super();
    }

    getAchieved( profile: Profile, gainedAchievements: IAchievement[] ) {
        let achievements = [];
        if (profile.completedGames >= 1 && !this.hasAchievement(gainedAchievements, "firstGame")) {
            achievements.push(this.achievementService.getAchievementByKey('firstGame'));
        }
        return achievements;
    }
}
