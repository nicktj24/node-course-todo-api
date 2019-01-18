const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 12
};

var token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded',decoded);

// ############################# Using crypto-js ###############################
// let message = 'I am Nikhil Tondare from Bramhapuri';
// let hash = SHA256(message).toString();
// console.log('Message : ',message);
// console.log('Hash Message : ',hash);

// let data = {
//   id:4
// };
// let token = {
//   data,
//   hash:SHA256(JSON.stringify(data)).toString() + 'somesecret'
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data.id)).toString();
//
// let resulthash = SHA256(JSON.stringify(token.data)).toString() + 'somesecret';
//
// if(token.hash === resulthash){
//   console.log('Data not changed');
// } else{
//   console.log('Data is changed');
// }
// ############################# Using crypto-js ###############################
