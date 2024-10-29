import OnlyLettersBetweenABlankSpace from "src/modules/shared/domain/services/only.letters.between.a.blank.space";
import { PrimitiveAddress } from "./restaurant";

export class Address {
    private _street: string;
    private _city: string;
    private _state: string;
    private _country: string;

    public constructor({ street, city, state, country }: PrimitiveAddress) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    public get street(): string {
        return this._street;
    }

    private set street(value: string) {

        this._street = value;
    }

    public get city(): string {
        return this._city;
    }

    private set city(value: string) {
        if (!OnlyLettersBetweenABlankSpace.validate(value)) {
            throw new Error(`invalid city`);
        };

        this._city = value;
    }

    public get state(): string {
        return this._state;
    }

    private set state(value: string) {
        if (!OnlyLettersBetweenABlankSpace.validate(value)) {
            throw new Error(`invalid state`);
        };

        this._state = value;
    }

    public get country(): string {
        return this._country;
    }

    private set country(value: string) {
        if (!OnlyLettersBetweenABlankSpace.validate(value)) {
            throw new Error(`invalid country`);
        };

        this._country = value;
    }

    public toString(): string {
        return `${this.street}, ${this.city}, ${this.state}, ${this.country}`;
    }

    public toPrimitive(): PrimitiveAddress {
        return {
            state: this._state,
            city: this._city,
            street: this._street,
            country: this._country,
        };
    };
}
