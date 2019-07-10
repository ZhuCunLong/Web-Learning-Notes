import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ListService } from '../list/list.service';
import { floorToMinute, ONE_HOUR, getCurrentTime } from '../../../utils/time';
import { Todo } from '../../../domain/entities';
import { TODOS } from '../local-storage/local-storage.namespace';
import { RankBy } from '../../../domain/type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todo$ = new Subject<Todo[]>();
  rank$ = new Subject<RankBy>();

  private todos: Todo[] = [];
  private rank: RankBy = 'title';

  constructor(
    private listService: ListService,
    private store: LocalStorageService
  ) { }

  private broadCast(): void {
    this.todo$.next(this.todos);
    this.rank$.next(this.rank);
  }

  private persist(): void {
    this.store.set(TODOS, this.todos);
  }

  /* 从localhost中获取数据 */
  getAll(): void {
    this.todos = this.store.getList(TODOS);
    this.broadCast();
  }

  /* 根据id获取对应的todo对象 */
  getByUUID(uuid: string): Todo | null {
    return this.todos.filter((todo: Todo) => todo._id === uuid)[ 0 ] || null;
  }

  /* 根据id删除todo */
  delete(uuid: string): void {
    const index = this.todos.findIndex(t => t._id === uuid);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.persist();
      this.broadCast();
    }
  }

  /* 删除列表项中所有的todolist */
  deleteInList(uuid: string): void {
    const toDelete = this.todos.filter(t => t.listUUID === uuid);
    toDelete.forEach(t => this.delete(t._id));
  }

  /* 添加 */
  add(title: string): void {
    const listUUID = this.listService.getCurrentListUuid();
    const newTodo = new Todo(title, listUUID);

    if (listUUID === 'today') {
      newTodo.planAt = floorToMinute(new Date()) + ONE_HOUR;
      newTodo.listUUID = 'todo';
    }

    this.todos.push(newTodo);
    this.persist();
    this.broadCast();
  }

  /* 修改 */
  update(todo: Todo): void {
    const index = this.todos.findIndex(t => t._id === todo._id);
    if (index !== -1) {
      todo.completedAt = todo.completedFlag ? getCurrentTime() : undefined;
      this.todos.splice(index, 1, todo);
      this.persist();
      this.broadCast();
    }
  }

  /* 将该待办事项移动到别的列表下 */
  moveToList(uuid: string, listUUID: string): void {
    const todo = this.getByUUID(uuid);
    if (todo) {
      todo.listUUID = listUUID;
      this.update(todo);
    }
  }

  /* 切换完成状态 */
  toggleTodoComplete(uuid: string): void {
    const todo = this.getByUUID(uuid);
    if (todo) {
      todo.completedFlag = !todo.completedFlag;
      todo.completedAt = todo.completedFlag ? getCurrentTime() : undefined;
      this.persist();
    }
  }

  setTodoToday(uuid: string): void {
    const todo = this.getByUUID(uuid);
    if (todo && !todo.completedFlag) {
      todo.planAt = floorToMinute(new Date()) + ONE_HOUR;
      this.update(todo);
    }
  }

  toggleRank(r: RankBy): void {
    this.rank = r;
    this.rank$.next(r);
  }
}
