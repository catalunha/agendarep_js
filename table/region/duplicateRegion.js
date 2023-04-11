const initB4a = require('../init');

const duplicateOneRegion = async (userProfileIdReceiver,id) => {
  console.log('duplicateOneRegion+++');
  // const userProfileIdReceiver = 'mwHolsSQ5U';

  // var userPointer = {
  //   __type: "Pointer",
  //   className: "Profile",
  //   objectId: "Z19OKN8vSG"
  // }
  let RegionDonate = new initB4a.Parse.Query('Region');
  const RegionDonateResult = await RegionDonate.get(id);
  if (RegionDonateResult !== undefined) {
    console.log(RegionDonateResult.id + ' duplicateOneRegion ');
    const RegionReceiver = new initB4a.Parse.Object("Region");
    // var userProfilePointerReceiver = {
    //   __type: "Pointer",
    //   className: "UserProfile",
    //   objectId: "mwHolsSQ5U"
    // }
    const userProfilePointerReceiver = new initB4a.Parse.Object("UserProfile");
    userProfilePointerReceiver.id = userProfileIdReceiver;
    RegionReceiver.set('seller', userProfilePointerReceiver);
    RegionReceiver.set('uf', RegionDonateResult.get('uf'));
    RegionReceiver.set('city', RegionDonateResult.get('city'));
    RegionReceiver.set('name', RegionDonateResult.get('name'));
    RegionReceiver.set('isDeleted', RegionDonateResult.get('isDeleted'));
    const profileResult = await RegionReceiver.save();
    console.log('Region new Id: '+profileResult.id);
    return profileResult.id;
  } else {
    console.log('Vazio...');
    return undefined;
  }
}

async function duplicateRegion(userProfileIdDonate,userProfileIdReceiver) {
  console.log('duplicateRegion+++');
  // const userProfileIdDonate = 'GBKL2qIKph';
  // const userProfileIdReceiver = 'mwHolsSQ5U';
  // var userProfilePointerDonate = {
  //   __type: "Pointer",
  //   className: "UserProfile",
  //   objectId: userProfileIdDonate
  // }
  let RegionDonate = new initB4a.Parse.Query('Region');
  const userProfilePointerDonate = new initB4a.Parse.Object("UserProfile");
  userProfilePointerDonate.id = userProfileIdDonate;
  RegionDonate.equalTo("seller", userProfilePointerDonate);
  const RegionDonateResults = await RegionDonate.find();
  if (RegionDonateResults.length !== 0) {
    for (let i = 0; i < RegionDonateResults.length; i++) {
      const RegionDonateObj = RegionDonateResults[i];
      console.log(RegionDonateObj.id + ' duplicanting ');
      await duplicateOneRegion(userProfileIdReceiver,RegionDonateObj.id);
      // // var userProfilePointerReceiver = {
      // //   __type: "Pointer",
      // //   className: "UserProfile",
      // //   RegionDonateObjId: userProfileIdReceiver
      // // }
      // const RegionReceiver = new initB4a.Parse.Object('Region');
      // const userProfilePointerReceiver = new initB4a.Parse.Object("UserProfile");
      // userProfilePointerReceiver.id = userProfileIdReceiver;
      // RegionReceiver.set('seller', userProfilePointerReceiver);
      // RegionReceiver.set('uf', RegionDonateObj.get('uf'));
      // RegionReceiver.set('city', RegionDonateObj.get('city'));
      // RegionReceiver.set('name', RegionDonateObj.get('name'));
      // RegionReceiver.set('isDeleted', RegionDonateObj.get('isDeleted'));
      // let profileResult = await RegionReceiver.save();
    }
  } else {
    console.log('Region Vazia...');
  }
  console.log('duplicateRegion---');
}

module.exports = { duplicateOneRegion, duplicateRegion };