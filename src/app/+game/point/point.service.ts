/**
 * point.service
 */

import { Injectable } from '@angular/core';
import { ProfileService } from "../achievement";

@Injectable()
export class PointService {

    constructor( private profileService: ProfileService ) {
    }

    getTotalPoints(): number {
        let points = this.profileService.getProfile().points;
        return points === null ? 0 : points;
    }
}
