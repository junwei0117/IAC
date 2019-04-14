import { fromOpenLocationCode, isValid, encode} from '@iota/area-codes';
import { composeAPI } from '@iota/core';
import { asciiToTrytes } from '@iota/converter';

const iota = composeAPI({ provider: 'https://node0.capjupiter.com:14267' });
const seed = 'JWISHUNGRYJWISHUNGRYJWISHUNGRYJWISHUNGRYJWISHUNGRYJWISHUNGRYJWISHUNGRYJWISHUNGRY9';
const depth = 3;
const minWeightMagnitude = 14;

const generateAddress = async ()  => {
  const receivingAddress = await iota.getNewAddress(seed, {
    index: 1,
    total: 1,
  });
  // tslint:disable
  console.log(`Address: ${receivingAddress[0]}`);
  return receivingAddress;
};

const fromLngAndLatToIAC = (lng: number, lat: number) => {
  const IAC = encode(lat, lng);
  return IAC;
}

const isIACValid = (IAC: string) => {
  const valid = isValid(IAC);
  console.log(valid);
};

const sendTransfer = async (IAC: string, address: string) => {
  const message = asciiToTrytes(`{'IAC': ${IAC}}`)
  const transfers = [{
    address,
    value: 0,
    message,
  }];
  const trytes = await iota.prepareTransfers(seed, transfers);
  const bundle = await iota.sendTrytes(trytes, depth, minWeightMagnitude);
  return bundle;
};

const start = async () => {
  const SyntrendIAC = fromLngAndLatToIAC(121.5288432, 25.045339);
  isIACValid(SyntrendIAC);
  const address = await generateAddress();
  const transactionBundle = await sendTransfer(SyntrendIAC, address[0]);

  // tslint:disable
  console.log(`IOTA Area Code: ${SyntrendIAC}`);
  console.log(`Published transaction with tail hash: ${transactionBundle[0].hash}`);
};

start();
