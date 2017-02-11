/**
 * game.component
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NotifierService } from "ng2-yk-notifier";

@Component({
    selector: 'app-game',
    styleUrls: ['./game.component.scss'],
    templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

    constructor( private vRef: ViewContainerRef,
                 private notifierService: NotifierService ) {
    }

    ngOnInit() {
        this.notifierService.setRootViewContainerRef(this.vRef);
    }

}
