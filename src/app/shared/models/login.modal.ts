export class Login {
    public _id: string;
    public username: string;
    public userType: string;
    public FName: string;
    public LName: string;
    public userId: string;
    public tokens: {
        access: string,
        token: string
    };
}
