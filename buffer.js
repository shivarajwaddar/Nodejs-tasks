let arr = [1, 2, 3, 4];
let bufferValue = Buffer.from(arr);
console.log(bufferValue); // <Buffer 01 02 03 04>

let str1 = "ABC";
let bufferValue2 = Buffer.from(str1);
console.log(bufferValue2); // <Buffer 41 42 43>

let str2 = "XYZ";
let bufferValue3 = Buffer.from(str2);
console.log(bufferValue3); // <Buffer 58 59 5A>

let combinedBuffer = Buffer.concat([bufferValue2, bufferValue3]);
console.log(combinedBuffer); // <Buffer 41 42 43 58 59 5A>
