const initB4a = require('./init');

const deleteTable = async (table) => {
  console.log('deleting+++');

  let query = new initB4a.Parse.Query(table);

  // var userPointer = {
  //   __type: "Pointer",
  //   className: "UserProfile",
  //   objectId: "mwHolsSQ5U"
  // }
  // query.equalTo("seller", userPointer);

  const userProfilePointer = new initB4a.Parse.Object("UserProfile");
  userProfilePointer.id = "mwHolsSQ5U";
  query.equalTo("seller", userProfilePointer);

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

module.exports = { deleteTable };