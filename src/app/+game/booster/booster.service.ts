/**
 * booster.service
 */

import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { PointService } from "../point";
import { NotifierService } from "ng2-yk-notifier";

export interface IBooster {
    cost: number;
    name: string;
    description: string;
    enabled: boolean;
}

@Injectable()
export class BoosterService {

    buyIncreaseTimeBooster = new EventEmitter<IBooster>();
    buyRemoveChoiceBooster = new EventEmitter<IBooster>();
    increaseTimeSuccess = new EventEmitter<IBooster>();
    removeChoiceSuccess = new EventEmitter<IBooster>();

    private url = "assets/data/quiz/boosters.json";

    constructor( private http: Http,
                 private pointService: PointService,
                 private notifier: NotifierService ) {
        this.listen();
    }

    getAllBoosters(): Observable<IBooster[]> {
        return this.http.get(this.url).map(( res ) => res.json());
    }

    buyBooster( booster: IBooster ): void {
        if (this.pointService.isBuyable(booster)) {
            if (booster.name === "increaseTime") {
                this.buyIncreaseTimeBooster.emit(booster);
                return;
            }
            if(booster.name === "deleteWrongAnswer") {
                this.buyRemoveChoiceBooster.emit(booster);
            }
        } else {
            this.notifier.error("Play more to obtain more coins.", "Not enough gold!");
        }
    }

    private listen(): void {
        this.increaseTimeSuccess.subscribe(
            ( booster: IBooster ) => this.pointService.onBoosterBought(booster)
        );

        this.removeChoiceSuccess.subscribe(
            ( booster: IBooster ) => this.pointService.onBoosterBought(booster)
        );
    }
}
