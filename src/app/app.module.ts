import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/NotFoundComponent';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { CompaniesService } from './company/companies.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReportPerusahaanComponent } from './report-perusahaan/report-perusahaan.component';
import { DataAccountComponent } from './data-account/data-account.component'; 
import { ScheduleService } from './schedule/schedule.service';
import {SplitButtonModule, ConfirmationService} from 'primeng/primeng';
import {GrowlModule,Message} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import { NgxLoadingModule } from 'ngx-loading';
import {ScheduleModule} from 'primeng/primeng';
import { EventService } from './data-account/event.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {InputSwitchModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { StorageServiceModule} from 'angular-webstorage-service';
import {TreeTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    CompanyComponent,
    ScheduleComponent,
    ReportPerusahaanComponent,
    DataAccountComponent
  ],
  imports: [
    BrowserModule,
    TreeTableModule,
    BrowserAnimationsModule,
    GrowlModule,
    CheckboxModule,
    StorageServiceModule,
    DialogModule,
    AngularFontAwesomeModule,
    ScheduleModule,
    AccordionModule,
    InputSwitchModule,
    NgxLoadingModule.forRoot({}),
    ToggleButtonModule,
    ButtonModule,
    DataTableModule,SharedModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      // {
      //   path: 'accountpayroll',
      //   component: AccountPayrollComponent
      // },
      {
        path: 'dataaccount',
        component: DataAccountComponent
      },
      {
        path: 'reportperusahaan',
        component: ReportPerusahaanComponent
      },
      // {
      //   path: 'reportpayroll',
      //   component: ReportPayrollComponent
      // },
      {
        path: '**',
        component: NotFoundComponent
      },
    ])
  ],
  providers: [
    HttpClient,
    CompaniesService,
    ScheduleService,
    EventService,
    ConfirmationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
