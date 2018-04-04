import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModifyRequestInterceptor} from './interceptors/modify-request.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {StoreModule} from '../store/store.module';

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
}
