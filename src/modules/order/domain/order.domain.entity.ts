import BaseDomainEntity from "src/modules/shared/domain/base.domain.entity";
import OnlyIntegersGreaterThanZero from "src/modules/shared/domain/services/only.integers.greater.than.zero";
import { PrimitiveOrder } from "./order";

export default class OrderDomainEntity extends BaseDomainEntity {
    private _clientId: string;
    private _restaurantId: string;
    private _description: string;

    public constructor({ clientId, restaurantId, description, id }: PrimitiveOrder) {

        super(id);

        this.clientId = clientId;
        this.restaurantId = restaurantId;
        this.description = description;
    }

    public get clientId(): string {
        return this._clientId;
    }

    public set clientId(value: string) {
        if (!OnlyIntegersGreaterThanZero.validate(value)) {
            throw new Error(`Invalid client ID`);
        }
        this._clientId = value;
    }

    public get restaurantId(): string {
        return this._restaurantId;
    }

    public set restaurantId(value: string) {
        if (!OnlyIntegersGreaterThanZero.validate(value)) {
            throw new Error(`Invalid restaurant ID`);
        }
        this._restaurantId = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }
}
