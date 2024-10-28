export default class OnlyLettersBetweenABlankSpace {
    static validate(value: string): boolean {
        return /^[A-Za-z]+( [A-Za-z]+)*$/.test(value);
    };
};