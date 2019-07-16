import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { LocalStorageService } from '../local-storage/local-storage.service'
import { List } from '../../../domain/entities'
import { LISTS } from '../local-storage/local-storage.namespace'

type SpecialListUUID = 'today' | 'todo'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private current: List
  private lists: List[] = []

  currentUuid: SpecialListUUID | string = 'today'
  currentUuid$ = new Subject<string>()
  current$ = new Subject<List>()
  lists$ = new Subject<List[]>()

  constructor(
    private store: LocalStorageService
  ) { }

  private broadCast(): void {
    this.lists$.next(this.lists);
    this.current$.next(this.current);
    this.currentUuid$.next(this.currentUuid);
  }

  setCurrentUuid(uuid: string): void {
    this.currentUuid = uuid;
    this.current = this.lists.find(l => l._id === uuid);
    this.broadCast();
  }

  /* 根据id获取列表元素 */
  private getByUuid(uuid: string): List {
    return this.lists.find(l => l._id === uuid);
  }

  /* 新元素修改完之后在原来的列表中删除旧项并添加新项 */
  private update(list: List): void {
    const index = this.lists.findIndex(l => l._id === list._id);
    if (index !== -1) {
      this.lists.splice(index, 1, list);
      this.persist();
      this.broadCast();
    }
  }

  /* 对修改做出马上保存 */
  private persist(): void {
    this.store.set(LISTS, this.lists);
  }

  getAll(): void {
    this.lists = this.store.getList(LISTS);
    this.broadCast();
  }

  /* 添加新的列表 */
  add(title: string): void {
    const newList = new List(title);
    this.lists.push(newList);
    this.current = newList;
    this.broadCast();

    this.currentUuid = newList._id;
    this.persist();
  }

  rename(listUuid: string, title: string) {
    const list = this.getByUuid(listUuid);
    if (list) {
      list.title = title;
      this.update(list);
    }
  }

  /* 删除指定的列表项 */
  delete(uuid: string): void {
    const i = this.lists.findIndex(l => l._id === uuid);
    if (i !== -1) {
      this.lists.splice(i, 1);
      this.currentUuid = this.lists.length
        ? this.lists[ this.lists.length - 1 ]._id
        : this.currentUuid === 'today'
          ? 'today'
          : 'todo';
      this.broadCast();
      this.persist();
    }
  }

  /* 获取当前列表选中项 */
  getCurrentListUuid(): SpecialListUUID | string {
    return this.currentUuid;
  }
}
