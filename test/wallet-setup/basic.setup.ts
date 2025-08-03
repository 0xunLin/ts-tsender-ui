// import necessary synpress modules
import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask } from '@synthetixio/synpress/playwright';
import { Context } from 'wagmi';

// define a test seed phrase and password // ideally to be in a secure location like environment variables(.env file)
const SEED_PHRASE = 'test test test test test test test test test test test junk' // anvil default seed phrase
const PASSWORD = 'Tester@1234'

// define the basic wallet setup
export default defineWalletSetup(PASSWORD, async(context, walletPage) => {
    // create a new MetaMask instance
    const metamask = new MetaMask(context, walletPage, PASSWORD);

    // import the wallet using the seed phrase
    await metamask.importWallet(SEED_PHRASE);
})