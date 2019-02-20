import { Component, OnInit } from '@angular/core';

import { SettingsService } from './services/service.index';
import { Title } from '@angular/platform-browser';
import { TitleService } from './title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public _ajustes: SettingsService , 
              public titleService: Title,
              private _titleService: TitleService) {}


    ngOnInit(): void {
        this._titleService.init();
    }

   // Set the Document Title
//    setTitle( newTitle: string) {
//     this.titleService.setTitle( newTitle );
//   }

}
