const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.initialize('VtcsOwYidKPYKz4gTXbLELZXEiu0s5xbo4JGu3wJ', 'lm3dLDw1k0nkEhzrSoOlUbkUTz10XM0r8KRWjbX3');


const deleteTable = async (table) => {
  console.log('deleting+++');


  var userPointer = {
    __type: "Pointer",
    className: "UserProfile",
    objectId: "mwHolsSQ5U"
  }
  let query = new Parse.Query(table);
  query.equalTo("seller", userPointer);
  const results = await query.find();
  if (results.length !== 0) {
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + ' deleting...');
      await object.destroy();
    }
  } else {
    console.log('Vazio...');
  }

  console.log('delete---');
}
async function duplicateRegion() {
  console.log('duplicateRegion+++');
const userProfileIdDoador= 'GBKL2qIKph';
const userProfileIdRecebedor= 'mwHolsSQ5U';
  var userProfilePointerDoador = {
    __type: "Pointer",
    className: "UserProfile",
    objectId: userProfileIdDoador
  }
  let query = new Parse.Query('Region');
  query.equalTo("seller", userProfilePointerDoador);
  const results = await query.find();
  if (results.length !== 0) {
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + ' duplicanting ');
      const table1 = new Parse.Object('Region');
      var userProfilePointerRecebedor = {
        __type: "Pointer",
        className: "UserProfile",
        objectId: userProfileIdRecebedor
      }
      table1.set('seller', userProfilePointerRecebedor);
      table1.set('uf', object.get('uf'));
      table1.set('city', object.get('city'));
      table1.set('name', object.get('name'));
      table1.set('isDeleted', object.get('isDeleted'));
      let profileResult = await table1.save();
    }
  } else {
    console.log('Region Vazia...');
  }
  console.log('duplicateRegion---');
};

async function duplicateAddress() {
  console.log('duplicateRegion+++');
  const userProfileIdDoador= 'GBKL2qIKph';
  const userProfileIdRecebedor= 'mwHolsSQ5U';
    var userProfilePointerDoador = {
      __type: "Pointer",
      className: "UserProfile",
      objectId: userProfileIdDoador
    }
  let query = new Parse.Query('Address');
  query.equalTo("seller", userProfilePointerDoador);
  const results = await query.find();
  if (results.length !== 0) {
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + ' duplicanting ');
      const table1 = new Parse.Object('Address');
      var userProfilePointerRecebedor = {
        __type: "Pointer",
        className: "UserProfile",
        objectId: userProfileIdRecebedor
      }

      table1.set('seller', userProfilePointerRecebedor);
      table1.set('name', object.get('name'));
      table1.set('phone', object.get('phone'));
      table1.set('description', object.get('description'));
      table1.set('parseGeoPoint', object.get('parseGeoPoint'));
      console.log('+1>'+object.get('region').id);
      const regionId = await duplicateOneRegion(object.get('region').id);
      var pointerDoador = {
        __type: "Pointer",
        className: "Region",
        objectId: regionId
      }
      table1.set('region', pointerDoador);
      table1.set('isDeleted', object.get('isDeleted'));

      let profileResult = await table1.save();
    }
  } else {
    console.log('Region Vazia...');
  }
  console.log('duplicateRegion---');
};
const duplicateOneRegion = async (id) => {
  console.log('duplicateOneRegion+++');

  // var userPointer = {
  //   __type: "Pointer",
  //   className: "Profile",
  //   objectId: "Z19OKN8vSG"
  // }
  let query = new Parse.Query('Region');
  const result = await query.get(id);
  if (result!== undefined) {
      console.log(result.id + ' duplicateOneRegion ');
      const table1 = new Parse.Object("Region");
      var userProfilePointerRecebedor = {
        __type: "Pointer",
        className: "UserProfile",
        objectId: "mwHolsSQ5U"
      }
      table1.set('seller', userProfilePointerRecebedor);
      table1.set('uf', result.get('uf'));
      table1.set('city', result.get('city'));
      table1.set('name', result.get('name'));
      table1.set('isDeleted', result.get('isDeleted'));
      const profileResult = await table1.save();
      console.log(profileResult.id);
      return profileResult.id;
  } else {
    console.log('Vazio...');
    return undefined;
  }
}

// deleteTable('Region');
// duplicateRegion();
duplicateAddress();