import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModifyRequestInterceptor} from './interceptors/modify-request.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {StoreModule} from '../store/store.module';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule
  ],
  declarations: [],
  providers: [
    UserService
    // {provide: HTTP_INTERCEPTORS, useClass: ModifyRequestInterceptor, multi: true},
  ],
})
export class CoreModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: httpLink.create({uri: 'http://localhost:3005/api/graphql'}),
      cache: new InMemoryCache()
    });
  }
}
