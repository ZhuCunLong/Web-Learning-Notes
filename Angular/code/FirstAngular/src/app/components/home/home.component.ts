import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public arr: Array<string> = ['zcl', 'zyt', 'wly', 'txf'];
  /* 0:审核未通过 1：审核通过 2：待审 其他：无效状态*/
  public approvalStatus: number = 3;
  public today: any = new Date();
  public modeltest: string = '默认值';
  @ViewChild('test') box: any;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.box.nativeElement.innerHTML);
  }
  handletest() {
    alert('hello angular');
  }
  onKeyup(e) {
    if (e.keyCode === 13) {
      console.log(e.target.value);
    }
  }
}
