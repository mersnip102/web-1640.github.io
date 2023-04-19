import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAccountComponent } from './admin/create-account/create-account.component';


import { LoginComponent } from './login/login.component';
import { QamComponent } from './qam/qam.component';
import { CategorymanagerComponent } from './qam/category-manager/category-manager.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StaffComponent } from './staff/staff.component';
import { TesttemComponent } from './testtem/testtem.component';

import { EventListComponent } from './admin/event-list/event-list.component';
import { EventAndDeadLineComponent } from './admin/event-and-deadline/event-and-deadline.component';
import { MostPopularIdeaComponent } from './qam/most-popular-idea/most-popular-idea.component';
import { DashBoardComponent } from './qam/dash-board/dash-board.component';
import { QacComponent } from './qac/qac.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { EventDetailComponent } from './qam/event-detail/event-detail.component';
import { DocumentDownloadComponent } from './qam/document-download/document-download.component';
import { StaffHomePageComponent } from './staff/staff-home-page/staff-home-page.component';
import { EachEventComponent } from './staff/each-event/each-event.component';
import { DepartmentManagerComponent } from './admin/department-manager/department-manager.component';
import { NewIdeaComponent } from './staff/each-event/new-idea/new-idea.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { QacHomepageComponent } from './qac/qac-homepage/qac-homepage.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'testtem', component: TesttemComponent },
  {
    path: 'qam', component: QamComponent,  canActivate: [AuthGuard], data: { allowedRoles: [2] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'categorymanager', component: CategorymanagerComponent },
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'idea', component: MostPopularIdeaComponent },
      { path: 'events/:id', component: EventDetailComponent },
      { path: 'documentdownload', component: DocumentDownloadComponent },
      { path: 'profileuser', component: ProfileUserComponent }]

  },

  {
    path: 'qac', component: QacComponent,canActivate: [AuthGuard], data: { allowedRoles: [3] },
    children:
      [
        { path: '', redirectTo: 'homepage', pathMatch: 'full' },
        { path: 'homepage', component: QacHomepageComponent },
        { path: 'profileuser', component: ProfileUserComponent }
      ]
  },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { allowedRoles: [1] },
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full'},
      { path: 'homepage', component: AdminHomepageComponent},
      { path: 'createaccount', component: CreateAccountComponent },
      { path: 'accountmanager', component: AccountManagerComponent },
      { path: 'eventlist', component: EventListComponent },
      { path: 'eventanddeadline', component: EventAndDeadLineComponent },
      { path: 'department', component: DepartmentManagerComponent },
      { path: 'profileuser', component: ProfileUserComponent }


    ],
  },
  {
    path: 'staff', component: StaffComponent, canActivate: [AuthGuard], data: { allowedRoles: [4] },
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: StaffHomePageComponent },
      { path: 'event/:id', component: EachEventComponent },
      { path: 'newidea/:id', component: NewIdeaComponent },
      { path: 'profileuser', component: ProfileUserComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
