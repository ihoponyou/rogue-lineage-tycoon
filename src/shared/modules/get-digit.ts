export function getDigit(number: number, digit: number) {
    const n = math.pow(10, digit);
    const n1 = math.pow(10, digit-1);
    return math.floor((number % n) / n1);
}