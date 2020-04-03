import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatAutocompleteModule,
  MatProgressBarModule
} from '@angular/material';



import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { TableListComponent } from './table-list/table-list.component';
// import { TypographyComponent } from './typography/typography.component';
// import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { ToastrModule } from 'ngx-toastr';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RandomGuard } from './guards/random.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthModule } from './auth/auth.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { TransportationApprovalComponent } from './transportation-approval/transportation-approval.component';
import { TransportationApproveComponent } from './transportation-approve/transportation-approve.component';
// import { SyllabusComponent } from './syllabus/syllabus.component';
// import { GenNotesComponent } from './gen-notes/gen-notes.component';
// import { ItemComponent } from './item/item.component';
// import { StockPurComponent } from './stock-pur/stock-pur.component';
// import { StockSubComponent } from './stock-sub/stock-sub.component';
// import { SupplierComponent } from './supplier/supplier.component';
// import { IssueAppComponent } from './issue-app/issue-app.component';
// import { BreakageComponent } from './breakage/breakage.component';
// import { UsageReportComponent } from './usage-report/usage-report.component';
@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatProgressBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthComponent,
  ],
  providers: [
    AuthModule,
    AdminLayoutModule,
    AuthGuard,
    RandomGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
