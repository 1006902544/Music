export interface ILogin {
  username: string,
  password: string
}

export interface IEnroll extends ILogin {
  name: string
}
