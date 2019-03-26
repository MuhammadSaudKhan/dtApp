import { MessagesComponent } from './messages/messages.component';
import { MembersListComponent } from './members-list/members-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'members', component: MembersListComponent, canActivate: [AuthGuard]},
    { path: 'list', component: ListComponent, canActivate: [AuthGuard]},
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'home', pathMatch: 'full'  }
];
