export interface ILoginQuery {
    username: string;
    password: string;
}

export interface ILogin {
    error: any,
    user: {
        id: string,
        email: string,
        name: string,
    },
    accessToken: string,

}