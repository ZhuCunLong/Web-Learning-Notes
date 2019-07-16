import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import {NzBadgeModule, NzCalendarModule, NzLayoutModule} from 'ng-zorro-antd';
import { SummaryService } from './summary.service';
import { SummaryRoutingModule } from './summary-routing.module';

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzCalendarModule,
    NzBadgeModule,
    SummaryRoutingModule
  ],
  providers: [ SummaryService ]
})
export class SummaryModule { }
