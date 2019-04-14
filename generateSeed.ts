export const generateSeed =  () => {

  const  length       = 81;                            // The length of the seed and int array.
  const  chars        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'; // The allowed characters in the seed.
  const  randomValues = new Uint32Array(length);       // An empty array to store the random values.
  const result       = new Array(length);             // An empty array to store the seed characters.

  window.crypto.getRandomValues(randomValues);      // Generate random values and store them to array.

  let cursor = 0;                                   // A cursor is introduced to remove modulus bias.
  for (let i = 0; i < randomValues.length; i++) {   // Loop through each of the 81 random values.
      cursor += randomValues[i];                    // Add them to the cursor.
      result[i] = chars[cursor % chars.length];     // Assign a new character to the seed based on cursor mod 81.
  }

  return result.join('');                           // Merge the array into a single string and return it.
};
