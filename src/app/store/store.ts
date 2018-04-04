import {Injectable} from '@angular/core';
import {INITIAL_STATE} from './state';

@Injectable()
export class Store {
  state = INITIAL_STATE;

  constructor() {
  }

}
