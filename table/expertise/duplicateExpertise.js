const initB4a = require('../init');

const duplicateOneExpertise = async (userProfileIdReceiver,id) => {
  console.log('duplicateOneExpertise+++');
  let ExpertiseDonate = new initB4a.Parse.Query('Expertise');
  const ExpertiseDonateResult = await ExpertiseDonate.get(id);
  if (ExpertiseDonateResult !== undefined) {
    console.log(ExpertiseDonateResult.id + ' duplicateOneExpertise ');
    const ExpertiseReceiver = new initB4a.Parse.Object("Expertise");
    const userProfilePointerReceiver = new initB4a.Parse.Object("UserProfile");
    userProfilePointerReceiver.id = userProfileIdReceiver;
    ExpertiseReceiver.set('seller', userProfilePointerReceiver);
    ExpertiseReceiver.set('code', ExpertiseDonateResult.get('code'));
    ExpertiseReceiver.set('name', ExpertiseDonateResult.get('name'));
    const profileResult = await ExpertiseReceiver.save();
    console.log('Expertise new Id: '+profileResult.id);
    return profileResult.id;
  } else {
    console.log('Vazio...');
    return undefined;
  }
}

async function duplicateExpertise(userProfileIdDonate,userProfileIdReceiver) {
  console.log('duplicateExpertise+++');
  let ExpertiseDonate = new initB4a.Parse.Query('Expertise');
  const userProfilePointerDonate = new initB4a.Parse.Object("UserProfile");
  userProfilePointerDonate.id = userProfileIdDonate;
  ExpertiseDonate.equalTo("seller", userProfilePointerDonate);
  const ExpertiseDonateResults = await ExpertiseDonate.find();
  if (ExpertiseDonateResults.length !== 0) {
    for (let i = 0; i < ExpertiseDonateResults.length; i++) {
      const ExpertiseDonateObj = ExpertiseDonateResults[i];
      console.log(ExpertiseDonateObj.id + ' duplicanting ');
      await duplicateOneExpertise(userProfileIdReceiver,ExpertiseDonateObj.id);
    }
  } else {
    console.log('Expertise Vazia...');
  }
  console.log('duplicateExpertise---');
}

module.exports = { duplicateOneExpertise, duplicateExpertise };