/**
 * point.service
 */

import { Injectable } from '@angular/core';
import { ProfileService } from "../achievement";
import { IBooster } from "../booster";
import { Subject } from "rxjs";

@Injectable()
export class PointService {

    totalPointsChange = new Subject<number>();

    constructor( private profileService: ProfileService ) {
    }

    getTotalPoints(): number {
        let points = this.profileService.getProfile().points;
        return points === null ? 0 : points;
    }

    isBuyable( booster: IBooster ): boolean {
        let points = this.profileService.getProfile().points;
        return points - booster.cost > 0;
    }

    onBoosterBought( booster: IBooster ) {
        let profile = this.profileService.getProfile();
        profile.points -= booster.cost;
        this.profileService.saveProfile(profile);
        this.totalPointsChange.next(profile.points);
    }
}
