 async function duplicateTable1() {
  console.log('duplicateTable1+++');

  var userPointer = {
    __type: "Pointer",
    className: "Profile",
    objectId: "Z19OKN8vSG"
  }
  let query = new Parse.Query('Table1');
  query.equalTo("userProfile", userPointer);
  const results = await query.find();
  if (results.length !== 0) {
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + ' duplicanting ');
      const table1 = new Parse.Object("Table1");
      var userPointer2 = {
        __type: "Pointer",
        className: "Profile",
        objectId: "r5N6A4DQvD"
      }
      table1.set('userProfile', userPointer2);
      table1.set('data', object.get('data'));
      let profileResult = await table1.save();
    }
  } else {
    console.log('Vazio...');
  }
  console.log('duplicateTable1---');
};


export { duplicateTable1};