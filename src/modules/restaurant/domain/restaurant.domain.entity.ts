import BaseDomainEntity from "src/modules/shared/domain/base.domain.entity";
import OnlyIntegersGreaterThanZero from "src/modules/shared/domain/services/only.integers.greater.than.zero";
import OnlyLettersBetweenABlankSpace from "src/modules/shared/domain/services/only.letters.between.a.blank.space";
import { Address } from "./address.value.object";
import { PrimitiveAddress, PrimitiveRestaurant } from "./restaurant";
import ClientDomainEntity from "src/modules/client/domain/client.domain.entity";

export default class RestaurantDomainEntity extends BaseDomainEntity {
    private _name: string;
    private _address: Address;
    private _capacity: string;
    private _clients: ClientDomainEntity[];

    public constructor({ name, address, capacity, clients, id }: PrimitiveRestaurant) {

        super(id);

        this.name = name;
        this.capacity = capacity;
        this.address = address;
        this.clients = clients;

    };

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get capacity(): string {
        return this._capacity;
    }

    public set capacity(value: string) {
        if (!OnlyIntegersGreaterThanZero.validate(value)) {
            throw new Error(`invalid restaurant capacity`);
        };

        this._capacity = value;
    }

    public get address(): Address {
        return this._address;
    }

    public set address(value: PrimitiveAddress) {
        this._address = new Address(value);
    }

    public get clients(): ClientDomainEntity[] {
        return this._clients;
    }

    public set clients(value: ClientDomainEntity[]) {
        this._clients = value;
    }

};