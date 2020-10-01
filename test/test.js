const {string} = require('../PS1.P1');
const {getOperator} = require('../PS1.P2');
const {decoratedValue, anotherdecoratedValue} = require('../PS1.P3');

const {describe, it} = require('mocha');
const {expect} = require('chai');

describe('PS1.P1.js Tests', () => {
    it('should return the alphabet backwards order', () => {
        let res = string('abcdefghijklmnopqrstuvwxyz');
        expect(res).to.be.equal('zyxwvutsrqponmlkjihgfedcba');
        let res2 = string('redsox');
        expect(res2).to.be.equal('xsroed');
    });
});

describe('PS1.P2.js Tests', () => {
    it('should return the number 3', () => {
        let res = getOperator('3*1');
        expect(res).to.be.equal(3);
        let res2 = getOperator('4-1');
        expect(res2).to.be.equal(3);
    });
});

describe('PS1.P3.js Tests', () => {
    it('should return the string with the letter c still there', () => {
        let res = `${decoratedValue}`;
        expect(res).to.be.equal("super,califragilisti,cexpialido,cious");
        let res2 = `${anotherdecoratedValue.length}`;
        expect(res2).to.be.equal("34")
    });
});