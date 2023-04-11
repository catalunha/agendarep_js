const initB4a = require('../init');

const duplicateOneSecretary = async (userProfileIdReceiver,id) => {
  console.log('duplicateOneSecretary+++');
  let SecretaryDonate = new initB4a.Parse.Query('Secretary');
  const SecretaryDonateResult = await SecretaryDonate.get(id);
  if (SecretaryDonateResult !== undefined) {
    console.log(SecretaryDonateResult.id + ' duplicateOneSecretary ');
    const SecretaryReceiver = new initB4a.Parse.Object("Secretary");
    const userProfilePointerReceiver = new initB4a.Parse.Object("UserProfile");
    userProfilePointerReceiver.id = userProfileIdReceiver;
    SecretaryReceiver.set('seller', userProfilePointerReceiver);
    SecretaryReceiver.set('email', SecretaryDonateResult.get('email'));
    SecretaryReceiver.set('name', SecretaryDonateResult.get('name'));
    SecretaryReceiver.set('phone', SecretaryDonateResult.get('phone'));
    SecretaryReceiver.set('birthday', SecretaryDonateResult.get('birthday'));
    SecretaryReceiver.set('isDeleted', SecretaryDonateResult.get('isDeleted'));
    const profileResult = await SecretaryReceiver.save();
    console.log('Secretary new Id: '+profileResult.id);
    return profileResult.id;
  } else {
    console.log('Vazio...');
    return undefined;
  }
}

async function duplicateSecretary(userProfileIdDonate,userProfileIdReceiver) {
  console.log('duplicateSecretary+++');
  let SecretaryDonate = new initB4a.Parse.Query('Secretary');
  const userProfilePointerDonate = new initB4a.Parse.Object("UserProfile");
  userProfilePointerDonate.id = userProfileIdDonate;
  SecretaryDonate.equalTo("seller", userProfilePointerDonate);
  const SecretaryDonateResults = await SecretaryDonate.find();
  if (SecretaryDonateResults.length !== 0) {
    for (let i = 0; i < SecretaryDonateResults.length; i++) {
      const SecretaryDonateObj = SecretaryDonateResults[i];
      console.log(SecretaryDonateObj.id + ' duplicanting ');
      await duplicateOneSecretary(userProfileIdReceiver,SecretaryDonateObj.id);
    }
  } else {
    console.log('Secretary Vazia...');
  }
  console.log('duplicateSecretary---');
}

module.exports = { duplicateOneSecretary, duplicateSecretary };