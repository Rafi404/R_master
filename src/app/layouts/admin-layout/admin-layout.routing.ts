import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RandomGuard } from 'app/guards/random.guard';
import { IssuebookComponent } from 'app/issuebook/issuebook.component';
import { TestComponent } from 'app/test/test.component';
import { TransactionsComponent } from 'app/transactions/transactions.component';
import { SampleComponent } from 'app/sample/sample.component';
import { AddBookComponent } from 'app/add-book/add-book.component';
import { SyllabusComponent } from 'app/syllabus/syllabus.component';
import { GenNotesComponent } from 'app/gen-notes/gen-notes.component';
import { ItemComponent } from 'app/item/item.component';
import { StockPurComponent } from 'app/stock-pur/stock-pur.component';
import { StockSubComponent } from 'app/stock-sub/stock-sub.component';
import { SupplierComponent } from 'app/supplier/supplier.component';
import { IssueAppComponent } from 'app/issue-app/issue-app.component';
import { BreakageComponent } from 'app/breakage/breakage.component';
import { UsageReportComponent } from 'app/usage-report/usage-report.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent , },
    { path: 'addBooks',       component: AddBookComponent , },
    { path: 'table-list',     component: TableListComponent , },
    { path: 'issuebook',     component: IssuebookComponent , },
    { path: 'transactions',  component: TransactionsComponent , },
    { path: 'typography',     component: TypographyComponent,  },
    { path: 'icons',          component: IconsComponent,  },
    { path: 'maps',           component: MapsComponent,  },
    { path: 'notifications',  component: NotificationsComponent,  },
    { path: 'test',  component: TestComponent,  },
    { path: 'sample',  component: SampleComponent,  },
    { path: 'upgrade',        component: UpgradeComponent,  },
    { path: 'userProfile', component: UserProfileComponent , canActivate: [RandomGuard], canLoad: [RandomGuard]},
    { path: 'syllabus', component: SyllabusComponent},
    { path: 'gen-notes',component: GenNotesComponent},
    { path: 'item' ,component: ItemComponent},
    { path: 'stock-pur', component: StockPurComponent},
    { path: 'stock-sub', component: StockSubComponent},
    { path: 'supplier', component: SupplierComponent},
    { path: 'issue-app', component: IssueAppComponent},
    { path: 'breakage', component: BreakageComponent},
    { path: 'usage-report', component: UsageReportComponent},

    
];
