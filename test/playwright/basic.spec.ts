// import { test, expect } from '@playwright/test';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../wallet-setup/basic.setup';
import { testWithSynpress } from '@synthetixio/synpress'; // testWithSynpress is a wrapper around Playwright's test function with extra features for wallet setup

const test = testWithSynpress(metaMaskFixtures(basicSetup))
// metaMaskFixtures uses the basicSetup defined in basic.setup.ts to set-up/create the MetaMask wallet before each test
// and it also provides the MetaMask instance to the test context in testWithSynpress
const { expect } = test

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tsender/)
});

test("should show the airdrop form when connected, otherwise, not", async ({ page, context, metamaskPage, extensionId}) => { // context, metamaskPage, and extensionId are provided by the testWithSynpress wrapper to help setup the MetaMask wallet 
  await page.goto('/');

  // check we see "please connect your wallet" text
  await expect(page.getByText('Please connect your wallet')).toBeVisible()

  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)
  await page.getByTestId('rk-connect-button').click()
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({
    state: 'visible',
    timeout: 30000, // wait for the MetaMask option to be visible
  })

  await page.getByTestId('rk-wallet-option-io.metamask').click()
  await metamask.connectToDapp() // this will spin up the MetaMask extension base on our basic setup and connect to the dapp

  const customNetwork = {
    name: 'Anvil',
    rpcUrl: 'http://127.0.0.1:8545',
    chainId: 31337,
    symbol: 'ETH'
  }
  await metamask.addNetwork(customNetwork)

  await expect(page.getByText('Token Address')).toBeVisible() // check the text "Token Address" is visible, which means the airdrop form is shown
})