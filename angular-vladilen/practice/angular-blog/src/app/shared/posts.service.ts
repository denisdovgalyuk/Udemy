import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IFBCreateResp, IPost} from '../admin/shared/interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  create(post: IPost): Observable<IPost> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((resp: IFBCreateResp) => {
          return {
            ...post,
            id: resp.name,
            date: new Date(post.date)
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {...post, id, date: new Date(post.date)};
        })
      );
  }

  getAll(): Observable<IPost[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((resp: { [key: string]: any }) => {
          console.log(resp);
          return Object.keys(resp).map(key => ({...resp[key], id: key, date: new Date(resp[key].date)}));
        })
      );
  }

}
