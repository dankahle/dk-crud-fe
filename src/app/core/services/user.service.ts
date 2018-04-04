import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../users/user';
import {Observable} from 'rxjs/Observable';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<User[]>(apiUrl + '/users');
    }

    getOne(id: number) {
        return this.http.get<User>(apiUrl + '/users/' + id);
    }

    addOne(user) {
        return this.http.post<User>(apiUrl + '/users', user);
    }

    updateOne(user) {
        return this.http.put<User>(apiUrl + '/users/' + user.id, user);
    }

    deleteOne(id: number) {
        return this.http.delete<User>(apiUrl + '/users/' + id);
    }

}
