import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../users/user';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/Observable';
import '../../shared/observable-additions';
import * as _ from 'lodash';

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

  getAllQuery = gql`
         query GetUsers {
          users {
            ...UserFragment
          }             
         }  
         ${this.userFragment}
      `;

  getAll(watch = false): Observable<User[]> {// change to init = false for cache verification in all list resolve calls

    const query = gql`
         query GetUsers {
          users {
            ...UserFragment
          }             
         }  
         ${this.userFragment}
      `;

    const obs =  this.apollo.query<any>({query: this.getAllQuery/*, fetchPolicy: 'network-only'*/})
      // .valueChanges
      .map(result => {
        // just shows defaultId, not the one you changed to if you modified in new InMemoryCache() options
        // maybe try: apollo.getClient().cache.config.dataIdFromObject??, thing is: the id is in the cache anyway
        // just hit devtools/cache to see it
        // result.data.users.forEach(u => console.log(u, defaultDataIdFromObject(u)));

        return this.sortUserList(result.data.users);
      })
      .catch(err => {
        console.error(err);
        return Observable.throw(err);
      });

    if (watch) {
      return obs;
    } else {
      return obs.first();
    }

/*
// for cache testing, stuff it in init, then enforce it's in cache after.
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
*/

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
    const mutation = gql`
      mutation AddOne($data: UserInput!) {
        add(data: $data) {
          ...UserFragment
        }
      }
      ${this.userFragment}
    `;

    return this.apollo.mutate({mutation, variables: {data: user},
      refetchQueries: [{query: this.getAllQuery}]})
      .map(result => {
        return result.data.user;
      })
      .catch(err => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  updateOne(user) {
    return this.http.put<User>(apiUrl + '/users/' + user.id, user);
  }

  deleteOne(id: string) {
    return this.http.delete<User>(apiUrl + '/users/' + id);
  }

  // for reuse between getall and addOne update section
  sortUserList(users) {
    return _.sortBy(users, user => user.name.toLowerCase()).reverse();
  }
}
