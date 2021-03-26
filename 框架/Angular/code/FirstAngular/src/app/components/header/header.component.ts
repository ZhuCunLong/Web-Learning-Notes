import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Output() msgUp = new EventEmitter<string>();
  @Output() titleUp = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  run() {
    this.msgUp.emit('子组件歪歪歪，父组件收到不用回答');
  }

  modify() {
    this.title = '子组件修改值了怎么说';
    this.titleUp.emit(this.title);
  }

}
