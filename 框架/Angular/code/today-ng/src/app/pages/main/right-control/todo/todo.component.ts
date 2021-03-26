import { Component, OnInit, OnDestroy, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { NzDropdownService, NzDropdownContextComponent } from 'ng-zorro-antd';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo, List } from '../../../../../domain/entities';
import { TodoService } from '../../../../services/todo/todo.service';
import { ListService } from '../../../../services/list/list.service';
import { floorToDate, getTodayTime } from '../../../../../utils/time';
import { BubbleSort} from '../../../../../utils/sort';
import { RankBy } from '../../../../../domain/type';

const rankerGenerator = (type: RankBy = 'title'): any => {
  if (type === 'completeFlag') {
    return (t1: Todo, t2: Todo) => t1.completedFlag && !t2.completedFlag;
  }
  return (t1: Todo, t2: Todo) => t1[ type ] > t2[ type ];
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  private dropdown: NzDropdownContextComponent;
  private destory$ = new Subject();

  todos: Todo[] = [];    // todo列表
  lists: List[] = [];    // list列表
  currentContextTodo: Todo;

  constructor(
    private listService: ListService,
    private todoService: TodoService,
    private router: Router,
    private dropdownService: NzDropdownService
  ) { }

  ngOnInit() {
    this.listService.lists$
      .pipe(takeUntil(this.destory$))
      .subscribe(lists => {
        this.lists = lists;
      });

    combineLatest(this.listService.currentUuid$, this.todoService.todo$, this.todoService.rank$)
      .pipe(takeUntil(this.destory$))
      .subscribe(sources => {
        this.processTodos(sources[ 0 ], sources[ 1 ], sources[ 2 ]);
      });

    this.todoService.getAll();
    this.listService.getAll();
  }

  ngOnDestroy() {
    this.destory$.next();
  }


  private processTodos(listUUID: string, todos: Todo[], rank: RankBy): void {
    const filteredTodos = todos
      .filter(todo => {
        return ((listUUID === 'today' && todo.planAt && floorToDate(todo.planAt) <= getTodayTime())
          || (listUUID === 'todo' && (!todo.listUUID || todo.listUUID === 'todo'))
          || (listUUID === todo.listUUID));
      })
      .map(todo => Object.assign({}, todo) as Todo);

    BubbleSort(filteredTodos, rankerGenerator(rank));

    this.todos = [].concat(filteredTodos);
  }

  add(title: string): void {
    this.todoService.add(title);
  }

  click(uuid: string): void {
    this.router.navigateByUrl(`/main/${uuid}`);
  }

  /* 修改代办事项的状态，已完成和待完成进行切换 */
  toggle(uuid: string): void {
    this.todoService.toggleTodoComplete(uuid);
  }

  /* 创建右键下拉菜单 */
  contextMenu(
    $event: MouseEvent,
    template: TemplateRef<void>,
    uuid: string  // 创建菜单时把对应的点击所在行的id传进来
  ): void {
    this.dropdown = this.dropdownService.create($event, template);
    this.currentContextTodo = this.todos.find(t => t._id === uuid);
  }

  /* 关闭右键下拉菜单 */
  close(): void {
    this.dropdown.close();
  }

  /* 将代办事项设为今天 */
  setToday(): void {
    this.todoService.setTodoToday(this.currentContextTodo._id);
  }

  /* 移动代办事项 */
  moveToList(listUuid: string): void {
    this.todoService.moveToList(this.currentContextTodo._id, listUuid);
  }

  /* 额外列表查询 */
  listsExcept(listUUID: string): List[] {
    return this.lists.filter(l => l._id !== listUUID);
  }

  /* 删除代办事项 */
  delete(): void {
    this.todoService.delete(this.currentContextTodo._id);
  }
}
