import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RandomGuard } from 'app/guards/random.guard';
import { TransportationComponent } from 'app/transportation/transportation.component';
import { TransportationApprovalComponent } from 'app/transportation-approval/transportation-approval.component';
import { TransportationApproveComponent } from 'app/transportation-approve/transportation-approve.component';


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
    { path: 'table-list',     component: TableListComponent , },
    { path: 'typography',     component: TypographyComponent,  },
    { path: 'icons',          component: IconsComponent,  },
    { path: 'maps',           component: MapsComponent,  },
    { path: 'notifications',  component: NotificationsComponent,  },
    { path: 'upgrade',        component: UpgradeComponent,  },
    { path: 'route-master', component: TransportationComponent,  },
    { path: 'transporatation-approval', component: TransportationApprovalComponent,  },
    { path: 'transporatation-approve',  component: TransportationApproveComponent,  },
    
  
    
];
