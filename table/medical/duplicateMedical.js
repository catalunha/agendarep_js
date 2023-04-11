const initB4a = require('../init');
const region = require('../region/duplicateRegion');

async function duplicateMedical(userProfileIdDonate,userProfileIdReceiver) {
  console.log('duplicateMedical+++');
  let MedicalDonate = new initB4a.Parse.Query('Medical');
  const userProfilePointerDonate = new initB4a.Parse.Object("UserProfile");
  userProfilePointerDonate.id = userProfileIdDonate;
  MedicalDonate.equalTo("seller", userProfilePointerDonate);
  const MedicalDonateResults = await MedicalDonate.find();
  if (MedicalDonateResults.length !== 0) {
    for (let i = 0; i < MedicalDonateResults.length; i++) {
      const MedicalDonateResult = MedicalDonateResults[i];
      console.log(MedicalDonateResult.id + ' duplicanting ');
      const MedicalReceiver = new initB4a.Parse.Object('Medical');
      const userProfilePointerReceiver = new initB4a.Parse.Object("UserProfile");
      userProfilePointerReceiver.id = userProfileIdReceiver;
      MedicalReceiver.set('seller', userProfilePointerReceiver);
      MedicalReceiver.set('email', MedicalDonateResult.get('email'));
      MedicalReceiver.set('name', MedicalDonateResult.get('name'));
      MedicalReceiver.set('phone', MedicalDonateResult.get('phone'));
      MedicalReceiver.set('crm', MedicalDonateResult.get('crm'));
      MedicalReceiver.set('isBlocked', MedicalDonateResult.get('isBlocked'));
      MedicalReceiver.set('birthday', MedicalDonateResult.get('birthday'));
      if (MedicalDonateResult.get('expertises') !== undefined) {
        console.log('>>> Duplicando Region deste Medical:' + MedicalDonateResult.get('region').id);
        const regionId = await region.duplicateOneRegion(userProfileIdReceiver,MedicalDonateResult.get('region').id);
        if (regionId !== undefined) {
          const newRegion = new initB4a.Parse.Object("Region");
          newRegion.id = regionId;
          MedicalReceiver.set('region', newRegion);
        }
      }else{
        console.log('>>> Nao há Secretary a ser duplicada');

      }
      MedicalReceiver.set('isDeleted', MedicalDonateResult.get('isDeleted'));

      let profileResult = await MedicalReceiver.save();
    }
  } else {
    console.log('Secretary Vazia...');
  }
  console.log('duplicateMedical---');
}

module.exports = { duplicateMedical };