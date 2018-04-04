import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {UserService} from '../../core/services/user.service';
import * as _ from 'lodash';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'dk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users;

  constructor(private userService: UserService, public app: AppComponent, route: ActivatedRoute) {
    route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    });
  }

  refresh() {
    this.userService.getAll()
      .subscribe(users => {
        this.users = _.sortBy(users, user => user.name.toLowerCase()).reverse();
      });
  }

  deleteUser(userId) {
    this.userService.deleteOne(userId)
      .subscribe(() => this.refresh());
  }

}
