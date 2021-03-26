import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  NzDropdownService,
  NzDropdownContextComponent,
  NzModalService
} from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { List } from '../../../../../domain/entities';
import { ListService } from '../../../../services/list/list.service';
import { TodoService } from '../../../../services/todo/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() isCollapsed: boolean;
  @ViewChild('listRenameInput') private listRenameInput: ElementRef;
  @ViewChild('listInput') private listInput: ElementRef;

  lists: List[];
  currentListUuid: string;
  contextListUuid: string;
  addListModalVisible = false;   // 添加列表模态框是否显示
  renameListModalVisible = false; // 重命名列表模态框是否显示

  private dropdown: NzDropdownContextComponent;  // 菜单-下拉框组件
  private destroy$ = new Subject();

  constructor(
    private dropdownService: NzDropdownService,  // 菜单-下拉框服务
    private listService: ListService,      // 列表服务
    private todoService: TodoService,      // todo列表服务
    private modal: NzModalService         // 模态框服务？
  ) { }

  ngOnInit() {
    this.listService.lists$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lists => {
        this.lists = lists;
      });

    this.listService.currentUuid$
      .pipe(takeUntil(this.destroy$))
      .subscribe(uuid => {
        this.currentListUuid = uuid;
      });

    // 这个方法，是给服务里的lists赋值的，从localstorage中拿数据
    this.listService.getAll();
  }

  click(uuid: string): void {
    this.listService.setCurrentUuid(uuid);
  }

  /*  打开模态框  */
  openAddListModal(): void {
    this.addListModalVisible = true;
    /* 这个计时器有点骚，在执行完之后，利用异步操作将页面的焦点设置在输入框中，妙啊 */
    setTimeout(() => {
      this.listInput.nativeElement.focus();
    });
    /*this.listInput.nativeElement.focus();*/
  }

  /*  关闭模态框  */
  closeAddListModal(): void {
    this.addListModalVisible = false;
  }

  /* 添加框内的确定按钮，添加新的内容 */
  add(title: string): void {
    this.listService.add(title);
    this.closeAddListModal();
  }

  /* 创建右键菜单 */
  contextMenu($event: MouseEvent, template: TemplateRef<void>, uuid: string): void {
    this.dropdown = this.dropdownService.create($event, template);
    this.contextListUuid = uuid;
  }

  /* 关闭右键菜单 */
  close(): void {
    this.dropdown.close();
  }

  /* 打开重命名对话框 */
  openRenameListModal(): void {
    this.renameListModalVisible = true;
    setTimeout(() => {
      const title = this.lists.find(l => l._id === this.contextListUuid).title;
      this.listRenameInput.nativeElement.value = title;
      this.listRenameInput.nativeElement.focus();
    });
    /*const title = this.lists.find(l => l._id === this.contextListUuid).title;
    this.listRenameInput.nativeElement.value = title;*/
  }

  /* 关闭重命名对话框 */
  closeRenameListModal(): void {
    this.renameListModalVisible = false;
  }

  /* 点击重命名按钮 */
  rename(title: string): void {
    this.listService.rename(this.contextListUuid, title);
    this.closeRenameListModal();
  }

  /* 点击菜单的删除按钮删除该列表项 */
  delete(): void {
    const uuid = this.contextListUuid;
    this.modal.confirm({
      nzTitle: '确认删除列表',
      nzContent: '该操作会导致该列表下的所有待办事项被删除',
      nzOnOk: () =>
        new Promise((res, rej) => {
          this.listService.delete(uuid);
          this.todoService.deleteInList(uuid);
          res();
        }).catch(() => console.error('Delete list failed'))
    });
  }
}
