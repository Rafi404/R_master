import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatBadgeModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatStepperModule,
  MatProgressBarModule,
  MatChipsModule,
  MatDatepickerModule,
  NativeDateAdapter,
  DateAdapter,
  MatNativeDateModule,
  MatTabsModule,
  MatCheckboxModule,
} from '@angular/material';
import { TokenInterceptor } from 'app/auth/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RandomGuard } from 'app/guards/random.guard';
import { AuthModule } from 'app/auth/auth.module';
import { AuthserviceService } from 'app/auth/authservice.service';
import { MessageService } from 'app/services/message.service';
import { TaskManagerComponent } from 'app/task-manager/task-manager.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatRadioModule,
    MatBadgeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [
    AuthserviceService,
    MessageService,
    AuthModule,
    RandomGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TaskManagerComponent,



  ]
})
export class AdminLayoutModule {}
