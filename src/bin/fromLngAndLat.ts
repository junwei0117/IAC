import { isValid, encode} from '@iota/area-codes';
import { composeAPI } from '@iota/core';
import { asciiToTrytes } from '@iota/converter';

const iota = composeAPI({ provider: 'https://node0.capjupiter.com:14267' });
const depth = 3;
const minWeightMagnitude = 14;

const generateSeed = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    const length = 81;
    const retVal = [];
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal[i] = charset.charAt(Math.floor(Math.random() * n));
    }
    const result = retVal.join('');
    return result;
};

const generateAddress = async (seed: string)  => {
  const receivingAddress = await iota.getNewAddress(seed, {
    total: 1,
  });
  return receivingAddress;
};

const isIACValid = (IAC: string) => {
  console.log('Is the IAC Valid?');
  const valid = isValid(IAC);
  if (valid) {
    console.log('Yes!');
  } else {
    console.log('Something Wrong!');
  }
};

const sendTransfer = async (IAC: string, seed: string, address: string) => {
  const message = asciiToTrytes(`{'IAC': ${IAC}}`);
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
  const StarRocketLng = 121.531119;
  const StarRocketLat = 25.045488;
  const StarRocketIAC = encode(StarRocketLng, StarRocketLat);

  console.log(`IOTA Area Code: ${StarRocketIAC}`);
  isIACValid(StarRocketIAC);

  const seed = generateSeed();
  const address = await generateAddress(seed);
  const transactionBundle = await sendTransfer(StarRocketIAC, seed, address[0]);

  console.log(`Transaction Hash: ${transactionBundle[0].hash}`);
};

start();
