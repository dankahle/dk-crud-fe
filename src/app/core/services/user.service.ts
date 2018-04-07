import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../users/user';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/Observable';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

    constructor(private apollo: Apollo, private http: HttpClient) {
    }

    getAll() {

      const query = gql`
         query GetUsers {
          users {
            id
            name
            age
          }             
         }  
      `;

      return this.apollo.watchQuery<any>({query})
          .valueChanges
          .map(result => result.data.users)
          .catch(err => {
            console.error(err);
            return Observable.throw(err);
          });
    }

    getOne(id: string) {
        return this.http.get<User>(apiUrl + '/users/' + id);
    }

    addOne(user) {
        return this.http.post<User>(apiUrl + '/users', user);
    }

    updateOne(user) {
        return this.http.put<User>(apiUrl + '/users/' + user.id, user);
    }

    deleteOne(id: string) {
        return this.http.delete<User>(apiUrl + '/users/' + id);
    }

}
