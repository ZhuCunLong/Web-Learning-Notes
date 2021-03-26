import { Component, OnInit, ViewChild } from '@angular/core'
import {StorageService} from '../../services/storage.service'

import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public arr: Array<string> = ['zcl', 'zyt', 'wly', 'txf']
  /* 0:审核未通过 1：审核通过 2：待审 其他：无效状态*/
  public approvalStatus: number = 3
  public today: any = new Date()
  public modeltest: string = '默认值'
  public title: string = '这是home组件的title'
  @ViewChild('test') box: any

  constructor(public service: StorageService) { }

  ngOnInit() {
    /*this.service.getcallbackData((data) => {
      console.log(data)
    })
    this.service.getPromiseData()
      .then((data) => {
      console.log(data)
    })
    const res = this.service.getRxjsData()
      .subscribe((data) => {
        console.log(data)
      })
    setTimeout(() => {
      res.unsubscribe(); // 取消订阅
    }, 1000)
    this.service.getIntervalPromiseData().then((data) => {
      console.log(data);
    })*/
    /*this.service.getIntervalRxjsData()
      .subscribe((data) => {
        console.log(data)
      })*/

   /* this.service.getIntervalRxjsNum()
      .pipe(
        filter((value: number) => {
          return value % 2 === 0
        })
      )
      .subscribe((data) => {
        console.log(data)
      })*/
  }
  ngAfterViewInit() {
    console.log(this.box.nativeElement.innerHTML)
  }
  handletest() {
    alert('hello angular')
  }
  onKeyup(e) {
    if (e.keyCode === 13) {
      console.log(e.target.value)
    }
  }

  sonsay(e) {
    window.alert(e)
  }

  titleUp(e) {
    this.title = e
  }
}
