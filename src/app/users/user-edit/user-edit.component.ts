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
        .subscribe(() => {
          this.router.navigateByUrl('/');

          // mutate.refreshQueries timing bug: It appears out add mutation's refreshQueries probably forces
          // a network only fetchPolicy, BUT... those queries happen "after" this subscribe fires, so when
          // we navigate to list page... still have old query values. It's something like this cause when we
          // put this setTimeout in there before routing, all works fine. Without it, it doesn't have enough
          // time to update the cache. Better to update the cache yourself then with update maybe?
/*
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 30); // 1000 works, 0 doesn't
*/
        });
    } else {
      this.userService.updateOne(this.user)
        .subscribe(() => this.router.navigateByUrl('/'));
    }
  }
}
