export default class OnlyIntegersGreaterThanZero {
    static validate(value: string): boolean {
        return /^[1-9]\d*$/.test(value);
    };
};