export interface ILoginQuery {
    username: string;
    password: string;
}

export interface ILogin {
    error: any,
    result: {
        accessToken: string,
    };
}