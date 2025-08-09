import { toFixedCost } from "../data/cart.js";

console.log('test suite: toFixedCost');

console.log('converts cents into dollars');

if (toFixedCost(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

if (toFixedCost(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if (toFixedCost(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}