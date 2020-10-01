const doOperation = (string, operation) =>  operation(string);

const decoratedValue = doOperation(
    "supercalifragilisticexpialidocious".split(/(?=c)/),
    (string) => string
)

console.log(`${decoratedValue}`);

const anotherdecoratedValue = doOperation(
    "supercalifragilisticexpialidocious",
    (string) => ({originalString: string,
        modifiedString: string.replace("a", "A"),
        numberReplaced: (string.match(/a/g) || []).length,
        length: string.length})
)

console.log(`${anotherdecoratedValue.originalString}, ${anotherdecoratedValue.modifiedString}, ${anotherdecoratedValue.numberReplaced}, ${anotherdecoratedValue.length}`);
module.exports = {doOperation, decoratedValue, anotherdecoratedValue}