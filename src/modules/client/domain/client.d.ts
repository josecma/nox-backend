export type PrimitiveClient = {
    id?: string;
    name: string;
    email: string;
    phone: {
        prefix: string,
        code: string,
        personalNumber: string;
    };
    age: string;
};

export type PrimitiveMobilePhoneNumber = Pick<ClientConstructorProps['phone'], 'prefix' | 'code' | 'personalNumber'>;