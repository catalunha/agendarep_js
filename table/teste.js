const initB4a = require('./init');

const teste1 = async (table) => {
  console.log('+++ teste');
  let query = new initB4a.Parse.Query('Region');
  try {
    const result = await query.get('eA8S3nHii9a');
    console.log(result.id);
    return result.id;
  } catch (error) {
    console.log('Nao achei');
    return undefined;

  }

}


module.exports = { teste1 };

Parse.Cloud.define('deleteTable', async (req) => {

  console.log('deleting+++');

  let query = new Parse.Query(table);

  const userProfilePointer = new Parse.Object("UserProfile");
  userProfilePointer.id = "mwHolsSQ5U";
  query.equalTo("seller", userProfilePointer);

  const results = await query.find(null, { useMasterKey: true });
  if (results.length !== 0) {
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + ' deleting...');
      await object.destroy({ useMasterKey: true });
    }
  } else {
    console.log('Vazio...');
  }

  console.log('delete---');
});