import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../users/user';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/Observable';
import {defaultDataIdFromObject} from 'apollo-cache-inmemory';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private apollo: Apollo, private http: HttpClient) {
  }

  userFragment = gql`
    fragment UserFragment on User {
      id
      name
      age
  }
  `;

  getAll(init = false): Observable<User[]> {// change to init = false for cache verification in all list resolve calls

    const query = gql`
         query GetUsers {
          users {
            ...UserFragment
          }             
         }  
         ${this.userFragment}
      `;


    if (init) {
      // this is init so only done once, so apollo.query not watchQuery right?
      return this.apollo.query<any>({query})
        .map(result => {
          // just shows defaultId, not the one you changed to if you modified in new InMemoryCache() options
          // result.data.users.forEach(u => console.log(u, defaultDataIdFromObject(u)));
          return result.data.users;
        })
        .catch(err => {
          console.error(err);
          return Observable.throw(err);
        });
    } else { // this was for insuring everything after init was just getting from cache, init calls with init=true and default is init=false
      const rtn = this.apollo.getClient().readQuery<any>({query});
      return Observable.of(rtn.users)
        .catch(err => {
          console.error(err);
          return Observable.throw(err);
        });
    }

  }

  getOne(id: string) {

    const query = gql`
         query GetUser($id: ID!) {
          user(id: $id) {
            ...UserFragment
          }             
         }  
         ${this.userFragment}
      `;

    return this.apollo.query<any>({query, variables: {id}})
      .map(result => {
        return result.data.user;
      })
      .catch(err => {
        console.error(err);
        return Observable.throw(err);
      });
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
