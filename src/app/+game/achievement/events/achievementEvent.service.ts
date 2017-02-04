/**
 * achievementEvent.service
 */

import { Injectable, EventEmitter } from '@angular/core';
import { AnswerStatus } from "../../quiz-game/answerStatus";
import { ProfileService } from "../profile/profile.service";
import { Profile } from "../profile/profile";
import { QuizTheme } from "../../quiz-game/quizTheme";
import { ThemeProfile } from "./themeProfile";
import { QuizStatus } from "../../quiz-game/quizStatus";
import { AchievementService, IAchievement } from "../achievement.service";
import { CompletedGamesHandler } from "./handlers/completedGamesHandler";

@Injectable()
export class AchievementEventService {

    answeredEvent = new EventEmitter<AnswerStatus>();
    completedEvent = new EventEmitter<QuizStatus>();
    achievementEvent = new EventEmitter<IAchievement>();

    private handlers: Array<any>;

    constructor( private profileService: ProfileService,
                 private achievementService: AchievementService,
                 private completedGamesHandler: CompletedGamesHandler ) {
        this.answeredEvent.subscribe(data => this.handleAnswered(data));
        this.completedEvent.subscribe(data => this.handleCompleted(data));
        this.handlers = [completedGamesHandler];
    }

    private handleAnswered( status: AnswerStatus ) {
        let profile = this.profileService.getProfile();
        let themeProfile = this.getThemeProfile(profile, status.theme);
        if (status.correct) {
            themeProfile.consecutively = themeProfile.consecutively == null ? 1 : themeProfile.consecutively + 1;
            themeProfile.correct = themeProfile.correct == null ? 1 : themeProfile.correct + 1;
            profile.consecutively = profile.consecutively == null ? 1 : profile.consecutively + 1;
            profile.correct = profile.correct == null ? 1 : profile.correct += 1;
        } else {
            themeProfile.consecutively = 0;
            themeProfile.wrong = themeProfile.wrong == null ? 1 : themeProfile.wrong + 1;
            profile.consecutively = 0;
            profile.wrong = profile.wrong == null ? 1 : profile.wrong + 1;
        }
        this.storeProfileInfo(profile, this.getAchieved(profile, status));
    }

    private handleCompleted( status: QuizStatus ) {
        let profile = this.profileService.getProfile();
        let themeProfile = this.getThemeProfile(profile, status.theme);
        themeProfile.completedGames = themeProfile.completedGames == null ? 1 : themeProfile.completedGames + 1;
        profile.completedGames = profile.completedGames == null ? 1 : profile.completedGames + 1;
        this.storeProfileInfo(profile, this.getAchieved(profile, null, status));
    }

    private getThemeProfile( profile: Profile, theme: QuizTheme ) {
        let currentThemeProfile = profile.themeProfiles.find(( themeProfile ) => themeProfile.theme.kind == theme.kind);
        if (currentThemeProfile == null) {
            let themeProfile = new ThemeProfile(theme);
            profile.themeProfiles.push(themeProfile);
            return themeProfile;
        } else {
            return currentThemeProfile;
        }
    }

    private getAchieved( profile: Profile, answer?: AnswerStatus, completed?: QuizStatus ) {
        if (answer === void 0) {
            answer = null;
        }
        if (completed === void 0) {
            completed = null;
        }
        let achievements = this.achievementService.getAchievementsFromLocalStorage();
        let gained = this.handlers.map(( handler ) => handler.getAchieved(profile, achievements, answer, completed));
        return [].concat.apply([], gained); // flatten an array
    }

    private storeProfileInfo( profile: Profile, achievements: IAchievement[] ) {
        let rewarded = this.getPoints(achievements);
        profile.points = profile.points == null ? rewarded : profile.points + rewarded;
        this.storeAchieved(achievements);
        this.profileService.saveProfile(profile);
    }

    private getPoints( achievements: IAchievement[] ) {
        let points = achievements.map(( achievement ) => achievement.points);
        return points != null && points.length > 0 ? points.reduce(( total, current ) => total + current) : 0;
    }

    private storeAchieved( achievements: IAchievement[] ) {
        achievements.filter(( achievement ) => achievement != null).forEach(
            ( achievement ) => {
                this.achievementService.pushAchievementToLocalStorage(achievement);
                this.achievementEvent.emit(achievement);
            }
        );
    }
}
