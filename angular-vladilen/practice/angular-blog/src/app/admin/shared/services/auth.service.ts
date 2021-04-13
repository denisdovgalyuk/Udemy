import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IFbAuthResponse, IUser} from '../interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const fbTokenLocalStorage = localStorage.getItem('fb-token');

    if (typeof fbTokenLocalStorage === 'string') {
      const expData: Date = new Date(fbTokenLocalStorage);

      if (new Date() > expData) {
        this.logout();
        return null;
      }
    }

    return fbTokenLocalStorage;
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post<IFbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private setToken(resp: IFbAuthResponse | null): IFbAuthResponse | null {
    if (resp) {
      const expDate = new Date(new Date().getTime() + +resp.expiresIn * 1000);
      localStorage.setItem('fb-token', resp.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      console.log('res ->', resp);
    } else {
      localStorage.clear();
    }

    return resp;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный password');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден');
        break;

    }
    return throwError(error);
  }
}
