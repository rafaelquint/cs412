const getOperator = expression => {
    let parsed = expression.split('')

    switch (parsed[1]) {
        case '+':
            return parsed[0] + parsed[2] //this is a function
            break;
        case '-':
            return parsed[0] - parsed[2]; //this is a function
            break;

        case '*':
            return parsed[0] * parsed[2]; //this is a function
            break;
        case '/':
            return parsed[0] / parsed[2]; //this is a function
            break;
        case '^':
            return parsed[0] ^ parsed[2]; //this is a function
            break;
        case '%':
            return parsed[0] % parsed[2]; //this is a function
            break;

    }
}

const expr = '8*3';
console.log(`${getOperator(expr)}`);

module.exports = {getOperator};