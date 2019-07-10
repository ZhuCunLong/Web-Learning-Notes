import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.scss']
})
export class QuickAddComponent implements OnInit {
  /* 子组件向父组件传值 */
  @Output() add = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addTodo(title: string) {
    if (title) {
      this.add.next(title);
    }
  }
}
