import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChartsComponent } from './pages/charts/charts.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ErrorPageComponent } from './pages/external/error-page/error-page.component';
import { ResetPaswordComponent } from './pages/external/reset-pasword/reset-pasword.component';
import { SigninComponent } from './pages/external/signin/signin.component';
import { SignupComponent } from './pages/external/signup/signup.component';
import { Signup2Component } from './pages/signup2/signup2.component';
import { HelpComponent } from './pages/help/help.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SpecialaccountComponent } from './pages/specialaccount/specialaccount.component';
import { ResetpassformComponent } from './pages/resetpassform/resetpassform.component';
import { TalentListComponent } from './pages/talent-list/talent-list.component';
import { TalentRequestsComponent } from './pages/talent-requests/talent-requests.component';
import { LoginGuard } from './login.guard';
import { EditclientComponent } from './pages/editclient/editclient.component';
import { EdittalentComponent } from './pages/edittalent/edittalent.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'update-client/:id',
    component: EditclientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-talent/:id',
    component: EdittalentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resetpassword',
    component: ResetPaswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
  {
    path: 'myaccount',
    component: SpecialaccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard] },
  { path: '404error', component: ErrorPageComponent },
  { path: 'create', component: Signup2Component, canActivate: [AuthGuard] },
  {
    path: 'list-admins',
    component: SpecialaccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-admin/:id',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myprofile',
    component: SpecialaccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restform',
    component: ResetpassformComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientlist',
    component: ClientListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'talentlist',
    component: TalentListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'talentrequests',
    component: TalentRequestsComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '/404error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
