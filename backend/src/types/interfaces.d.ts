export interface IUser {
    email: string;
    phone: string;
    role: "customer" | "merchant";
    createdAt: Date;
}

export interface IOTP {
    type: "email" | "phone";
    value: string;
    otp: string;
    createdAt: Date;
}