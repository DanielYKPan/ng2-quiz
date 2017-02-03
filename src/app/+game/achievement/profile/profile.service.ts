/**
 * profile.service
 */

import { Injectable } from '@angular/core';
import { Profile } from "./profile";

@Injectable()
export class ProfileService {

    constructor() {
    }

    saveProfile( profile: Profile ): void {
        localStorage.setItem("quizle.profile", JSON.stringify(profile));
    }

    getProfile(): Profile {
        let profileString = localStorage.getItem("quizle.profile");
        if (profileString != null) {
            return JSON.parse(profileString);
        }
        else {
            return new Profile();
        }
    }
}
