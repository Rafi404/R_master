import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Books',  icon: 'collections_bookmark', class: '' },
    // { path: '/addBooks', title: 'Add Book',  icon: 'post_add', class: '' },
    // { path: '/issuebook', title: 'Issue Book',  icon: 'content_paste', class: '' },
    // { path: '/transactions', title: 'Transactions',  icon: 'transfer_within_a_station', class: '' },
    // { path: '/test', title: 'Test',  icon: 'content_paste', class: '' },
    // { path: '/syllabus', title: 'Syllabus', icon: 'school', class: ''},
    // {path: '/gen-notes', title:'Genaral Notes', icon:'list_alt', class:''},
    // {path: '/item', title:'Item', icon:'how_to_vote', class:''},
    {path: '/stock-pur', title: 'Stock Purchase', icon:'archive', class:''},
    {path: '/stock-sub', title: 'Subsidiary Stock', icon:'archive', class:''},
    {path: '/supplier', title: 'Supplier', icon:'person', class:''},
    {path: '/issue-app', title: 'Issue Apparatus', icon:'repeate', class:''},
    {path: '/breakage', title: 'Breakage', icon:'texture', class:''},
    // { path: '/userProfile', title: 'user Profile',  icon: 'post_add', class: '' },
    // { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
