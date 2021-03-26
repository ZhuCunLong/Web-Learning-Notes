import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public title: string = '这是一个新闻组件';
  content = '<h1>我是一个html</h1>';
  public arr: any[] = ['zcl', 'zyt', 'wly', 'txf'];
  public arr1: Array<string> = ['zcl', 'zyt', 'wly', 'txf'];
  constructor() { }

  ngOnInit() {
  }

}
