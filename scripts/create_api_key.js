/* eslint-disable no-console */

import config from 'config';
import constructApp from 'src/app';

const { useCases } = constructApp(config);
const { createApiKey } = useCases.authentication;

const call = async () => {
  console.log('Creating a new API Key pair...');
  const result = await createApiKey();

  if (result.isLeft()) {
    console.error(`An unexpected error occurred: ${result.left()}`);
  } else {
    const { publicKey, plainTextPrivateKey } = result.right();

    console.log(
      'A new API Key was successfully created: \n'
      + `\tpublicKey: ${publicKey}\n`
      + `\tprivateKey: ${plainTextPrivateKey}.\n`
      + 'Please make sure you\'ve saved the keys before leaving the screen.\n'
      + 'These keys won\'t be possible to be shown again if forgotten or lost.',
    );
  }
};

call();

/* eslint-enable no-console */
