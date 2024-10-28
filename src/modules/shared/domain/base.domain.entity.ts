import OnlyIntegersGreaterThanZero from "./services/only.integers.greater.than.zero";

export default class BaseDomainEntity {
    protected _id?: string;

    public constructor(id: string) {
        this.id = id;
    };

    public get id(): string {
        return this._id;
    };

    private set id(value: string) {
        if (value) {
            if (!OnlyIntegersGreaterThanZero.validate(value)) {
                throw new Error(`invalid id format`);
            };
            this._id = value;
        }
    };

};