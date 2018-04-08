import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '../store/store.module';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from '../users/user-list/user-list.component';
import {UserListItemComponent} from '../users/user-list-item/user-list-item.component';
import {UserEditComponent} from '../users/user-edit/user-edit.component';
import {UserResolver} from './resolvers/user.resolver';
import {UserListResolver} from './resolvers/user-list.resolver';
import {InitializationGuard} from './guards/initialization.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent,
    resolve: {users: UserListResolver},
    canActivate: [InitializationGuard]
  },
  {
    path: 'user/:id',
    component: UserEditComponent,
    resolve: {user: UserResolver},
    canActivate: [InitializationGuard]
  },
  {path: '**', redirectTo: '/user'}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [UserListResolver, UserResolver, InitializationGuard]
})
export class RoutingModule {
}
