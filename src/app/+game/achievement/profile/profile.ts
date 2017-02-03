/**
 * profile
 */
import { ThemeProfile } from "../events/themeProfile";

export class Profile {
    points: number;
    themeProfiles: ThemeProfile[];
    consecutively: number;
    wrong: number;
    correct: number;
    completedGames: number;

    constructor() {
        this.points = 0;
        this.themeProfiles = [];
    }
}
