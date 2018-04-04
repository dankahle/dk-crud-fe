import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user';
import * as _ from 'lodash';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'dk-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  user: User;
  addMode: boolean;

  constructor(private route: ActivatedRoute, public router: Router, private userService: UserService) {
    this.addMode = route.snapshot.params.id === 'add';
    if (this.addMode) {
      this.user = <User>{name: '', age: undefined};
    } else {
      this.user = _.cloneDeep(route.snapshot.data.user);
    }
  }

  submit() {
    if (this.addMode) {
      this.userService.addOne(this.user)
        .subscribe(() => this.router.navigateByUrl('/'));
    } else {
      this.userService.updateOne(this.user)
        .subscribe(() => this.router.navigateByUrl('/'));
    }
  }
}
