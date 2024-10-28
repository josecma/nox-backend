import { PrimitiveMobilePhoneNumber } from "../client";

export default class MobilePhoneNumber {
    private _prefix: string;
    private _code: string;
    private _personalNumber: string;

    public constructor({ prefix, code, personalNumber }: PrimitiveMobilePhoneNumber) {
        this.prefix = prefix;
        this.code = code;
        this.personalNumber = personalNumber;

    }

    private set prefix(value: string) {
        if (value !== '+53') {
            throw new Error(`invalid prefix`);
        }
        this._prefix = value;
    }

    private set code(value: string) {
        if (value !== '5') {
            throw new Error(`invalid code`);
        }
        this._code = value;
    }

    private set personalNumber(value: string) {
        if (!/^\d{7}$/.test(value)) {
            throw new Error(`invalid personal number`);
        }

        this._personalNumber = value;
    }

    public toString(): string {
        return `${this._prefix} ${this._code} ${this._personalNumber}`;
    }

    public toPrimitive(): PrimitiveMobilePhoneNumber {
        return {
            prefix: this._prefix,
            code: this._code,
            personalNumber: this._personalNumber,
        };
    };

}
