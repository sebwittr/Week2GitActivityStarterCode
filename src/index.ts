import { Calculator } from './calculator';

const calc = new Calculator();

const result_add = calc.add(2, 3);
const result_sub = calc.subtract(4, 1);
const result_mul = calc.mul(2,3);
console.log(`result_add = ${result_add}`);
console.log(`result_sub = ${result_sub}`);  
console.log(`result_mul = ${result_mul}`);

const result_divide = calc.divide(6, 3);
console.log(`result_divide = ${result_divide}`);

calc.hello();
console.log("done.");
