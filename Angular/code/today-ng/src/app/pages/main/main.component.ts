import { Component, OnInit, HostBinding } from '@angular/core';
import { mainPageSwitchTransition } from './main.animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [ mainPageSwitchTransition ]
})
export class MainComponent implements OnInit {

  isCollapsed = false;
  constructor() { }

  @HostBinding('@mainPageSwitchTransition') state =  'activated'
  ngOnInit() {
  }

}
