const initB4a = require('../init');
const region = require('../region/duplicateRegion');

async function duplicateAddress(userProfileIdDonate,userProfileIdReceiver) {
  console.log('duplicateRegion+++');
  // const userProfileIdDonate = 'GBKL2qIKph';
  // const userProfileIdReceiver = 'mwHolsSQ5U';
  // var userProfilePointerDonate = {
  //   __type: "Pointer",
  //   className: "UserProfile",
  //   objectId: userProfileIdDonate
  // }
  let AddressDonate = new initB4a.Parse.Query('Address');
  const userProfilePointerDonate = new initB4a.Parse.Object("UserProfile");
  userProfilePointerDonate.id = userProfileIdDonate;
  AddressDonate.equalTo("seller", userProfilePointerDonate);
  const AddressDonateResults = await AddressDonate.find();
  if (AddressDonateResults.length !== 0) {
    for (let i = 0; i < AddressDonateResults.length; i++) {
      const AddressDonateResult = AddressDonateResults[i];
      console.log(AddressDonateResult.id + ' duplicanting ');
      const AddressReceiver = new initB4a.Parse.Object('Address');
      // var userProfilePointerReceiver = {
      //   __type: "Pointer",
      //   className: "UserProfile",
      //   objectId: userProfileIdReceiver
      // }
      const userProfilePointerReceiver = new initB4a.Parse.Object("UserProfile");
      userProfilePointerReceiver.id = userProfileIdReceiver;
      AddressReceiver.set('seller', userProfilePointerReceiver);
      AddressReceiver.set('name', AddressDonateResult.get('name'));
      AddressReceiver.set('phone', AddressDonateResult.get('phone'));
      AddressReceiver.set('description', AddressDonateResult.get('description'));
      AddressReceiver.set('parseGeoPoint', AddressDonateResult.get('parseGeoPoint'));
      if (AddressDonateResult.get('region') !== undefined) {
        console.log('>>> Duplicando Region deste Address:' + AddressDonateResult.get('region').id);
        const regionId = await region.duplicateOneRegion(userProfileIdReceiver,AddressDonateResult.get('region').id);
        if (regionId !== undefined) {
          // var pointerDonate = {
          //   __type: "Pointer",
          //   className: "Region",
          //   objectId: regionId
          // }
          const newRegion = new initB4a.Parse.Object("Region");
          newRegion.id = regionId;
          AddressReceiver.set('region', newRegion);
        }
      }else{
        console.log('>>> Nao há Region a ser duplicada');

      }
      AddressReceiver.set('isDeleted', AddressDonateResult.get('isDeleted'));

      let profileResult = await AddressReceiver.save();
    }
  } else {
    console.log('Region Vazia...');
  }
  console.log('duplicateRegion---');
}

module.exports = { duplicateAddress };