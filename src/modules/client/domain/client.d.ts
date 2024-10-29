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

export type PrimitiveMobilePhoneNumber = Pick<PrimitiveClient['phone'], 'prefix' | 'code' | 'personalNumber'>;