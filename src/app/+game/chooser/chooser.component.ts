/**
 * chooser.component
 */

import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-game-chooser',
    templateUrl: './chooser.component.html',
    styleUrls: ['./chooser.component.scss']
})

export class GameChooserComponent implements OnInit {

    private themes = [
        {name: 'Animals', slug: 'animals', theme: 'violet'},
        {name: 'Brain Teasers', slug: 'brain-teasers', theme: 'pink'},
        {name: 'General', slug: 'general', theme: 'teal'},
        {name: 'Entertainment', slug: 'entertainment', theme: 'yellow'},
        {name: 'For Kids', slug: 'for-kids', theme: 'blue'},
        {name: 'Literature', slug: 'literature', theme: 'purple'},
        {name: 'Movies', slug: 'movies', theme: 'olive'},
        {name: 'Science and Technology', slug: 'science-technology', theme: 'red'},
        {name: 'Sports', slug: 'sports', theme: 'green'},
        {name: 'Video Games', slug: 'video-games', theme: 'orange'},
    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}
