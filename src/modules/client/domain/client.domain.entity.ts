import BaseDomainEntity from "src/modules/shared/domain/base.domain.entity";
import OnlyIntegersGreaterThanZero from "src/modules/shared/domain/services/only.integers.greater.than.zero";
import OnlyLettersBetweenABlankSpace from "src/modules/shared/domain/services/only.letters.between.a.blank.space";
import ValidEmail from "./services/valid.email";
import MobilePhoneNumber from "./value.objects/mobile.phone.number";
import { PrimitiveClient, PrimitiveMobilePhoneNumber } from "./client";

export default class ClientDomainEntity extends BaseDomainEntity {
    private _name: string;
    private _email: string;
    private _phone: MobilePhoneNumber;
    private _age: string;

    public constructor({ name, email, phone, age, id }: PrimitiveClient) {

        super(id);

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;

    };

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (!OnlyLettersBetweenABlankSpace.validate(value)) {
            throw new Error(`invalid client name`);
        };
        this._name = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (!ValidEmail.validate(value)) {
            throw new Error(`invalid client email`);
        };
        this._email = value;
    }

    public get phone(): MobilePhoneNumber {
        return this._phone;
    }

    public set phone(value: PrimitiveMobilePhoneNumber) {
        this._phone = new MobilePhoneNumber(value);
    }

    public get age(): string {
        return this._age;
    }

    public set age(value: string) {
        if (!OnlyIntegersGreaterThanZero.validate(value)) {
            throw new Error(`invalid client age`);
        }
        this._age = value;
    }

};