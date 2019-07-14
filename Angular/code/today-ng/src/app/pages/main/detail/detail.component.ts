import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  HostBinding
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { TodoService } from '../../../services/todo/todo.service';
import { Todo } from '../../../../domain/entities';
import { lessThanADay, floorToDate, getCurrentTime, getTodayTime, floorToMinute } from '../../../../utils/time';

import { detailTransition } from './detail.animation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [ detailTransition ]
})
export class DetailComponent implements OnInit {
  @HostBinding('@detailTransition') state = 'activated';
  @Output() changedTodo = new EventEmitter();

  private trueSource: Todo;
  currentTodo: Todo;
  dueDate: Date;
  planDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private message: NzMessageService     // alert的替代品
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(first()).subscribe((paramsMap: ParamMap) => {
      const id = paramsMap.get('id');
      const todo = this.todoService.getByUUID(id);
      this.trueSource = todo;
      this.currentTodo = Object.assign({}, todo) as Todo;
      if (todo.dueAt) {
        this.dueDate = new Date(todo.dueAt);
      }
      if (todo.planAt) {
        this.planDate = new Date(todo.planAt);
      }
    });
  }

  /* 点击遮罩层返回 */
  goBack(): void {
    this.router.navigateByUrl('main');
  }

  /* 左上角确认按钮点击事件 */
  confirm(): void {
    this.todoService.update(this.currentTodo);
    this.goBack();
  }

  /* 确认删除按钮点击事件 */
  delete(): void {
    this.todoService.delete(this.currentTodo._id);
    this.goBack();
  }

  dueDisabledDate = (d: Date): boolean => floorToDate(d) < getTodayTime();
  planDisabledDate = (d: Date): boolean => floorToMinute(d) < getCurrentTime();

  /* 截止时间设置 */
  handleDueDateChange(date: Date): void {
    const dueAt = date ? date.getTime() : undefined;
    this.currentTodo.dueAt = dueAt;
    if (dueAt && lessThanADay(dueAt)) {
      this.message.warning('项目将会在 24 小时内到期', {
        nzDuration: 6000
      });
    }
    this.checkDate();
  }

  /* 开始时间设置 */
  handlePlanDateChange(date: Date): void {
    const t = date ? date.getTime() : undefined;
    if (!t) {
      this.currentTodo.notifyMe = false;
    }
    this.currentTodo.planAt = t;
    this.checkDate();
  }

  /*  检查开始时间和截止时间的关系 */
  private checkDate(): void {
    const { dueAt, planAt } = this.currentTodo;
    if (dueAt && planAt && floorToDate(planAt) > dueAt) {
      this.message.warning('你确定要在到期之后才开始做这个项目吗？', {
        nzDuration: 6000
      });
    }
  }

  clickSwitch(): void {
    if (this.currentTodo.completedFlag) { return; }
    if (!this.currentTodo.planAt) {
      this.message.warning('尚未设置计划日期');
      return;
    }
    this.currentTodo.notifyMe = !this.currentTodo.notifyMe;
  }
}
