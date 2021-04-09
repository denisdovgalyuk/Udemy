export interface IUser {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IFbAuthResponse {
  displayName: string;
  email: string;
  idToken: string;
  kind: string;
  localID: string;
  registered: boolean;
  expiresIn: string;
}

export interface IPost {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}
