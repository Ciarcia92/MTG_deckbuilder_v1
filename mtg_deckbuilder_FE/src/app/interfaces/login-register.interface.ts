export interface RegisterUser {
  username: string,
  name: string,
  email: string,
  password: string

}

export interface LoginUser {
  username: string,
  password: string
}

export interface AuthUser {

  accessToken: string,
  user: {
      email: string,
      name: string,
      id: number
  }
}
