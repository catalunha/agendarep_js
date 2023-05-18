// const Parse = require('parse/node');

// Parse.serverURL = 'https://parseapi.back4app.com/';
// Parse.initialize('', '');

// const teste = require('./table/teste.js');
// const teste2 = async (table) => {
//   const a = await teste.teste1();
//   console.log(a);

// }
// teste2();



const table = require('./table/delete');
const region = require('./table/region/duplicateRegion');
const address = require('./table/address/duplicateAddress');


// table.deleteTable('Region');
// table.deleteTable('Address');
// region.duplicateRegion();
// address.duplicateAddress('GBKL2qIKph','mwHolsSQ5U');
