import { BitGo } from "../../BitGoJS/modules/bitgo/dist/src/index";
import {Tpolygon } from "../../BitGoJS/modules/sdk-coin-polygon";
//import {Tsol } from "../../BitGoJS/modules/sdk-coin-sol";
import { BitGoAPIOptions } from "../../BitGoJS/modules/sdk-api/src";
import { WalletWithKeychains } from "@bitgo-beta/bitgo";

interface Target {
	apiOptions: BitGoAPIOptions,
	enterprise: string,
}

/**
 * user: pengyuchen@bitgo.com
 * enterprise:  Nitro Test 63dabf5a1cd73e00073f2a7c50971485
 * enterprise: blockchain OS 61ba62d1033dc50008ac9c00dbb34c50
 */
const test: Target = {
	apiOptions: {
		env: "test",
		//customRootURI: 'https://app.bitgo-test.com',
		accessToken: 'v2xa0b4544f08d28fc12c0b247ecdbeb0c3db16942433a9b49b72e8948f50205d52'
	},
	enterprise: '61ba62d1033dc50008ac9c00dbb34c50',
};

/**
 * user: pengyuchen@bitgo.com
 * enterprise: 63dc9e77b61fa400079bd6a1ee570048
 */
const dev: Target = {
	apiOptions: {
		env: "dev",
		customRootURI: 'https://app.bitgo-dev.com',
		accessToken: 'v2x972d8963ed1393fd82c60a68da3f8a998f3f05714f0fbcb7f1e99fb2e2da8e51'
	},
	enterprise: '63dc9e77b61fa400079bd6a1ee570048',
};

/**
 * Env: pr29186
 * user: pengyuchen@bitgo.com (63dcbb012c17ca000728988b5b5f8b52), PW: @li03O2JtKmO08WK
 */
const pr: Target = {
	apiOptions: {
		env: "custom",
		customRootURI: 'https://pr29186-app.bitgo-dev.com',
		accessToken: 'v2xee400d0c48636bae07fff647a3acebce40e0603416ba4760d36e023b375cbada'
	},
	enterprise: '63edc139463296000735d4e4d4810804',
};

const curEnv:Target = pr;

const bitgo = new BitGo(curEnv.apiOptions);
const coin = 'tpolygon';
bitgo.register(coin, Tpolygon.createInstance);

const bitgoCoin = bitgo.coin(coin);

// const coin = 'tsol';
// bitgo.register(coin, Tsol.createInstance);
const password = `12345`;

async function createWallet(): Promise<WalletWithKeychains> {
	console.log("creating wallet, this might take a few seconds....");
	await bitgo.unlock({ otp: "000000" });

	const wallet = await bitgoCoin
		.wallets()
		.generateWallet({
			label:  "test-wallet",
			passphrase: password,
			multisigType: 'tss',
			walletVersion: 3,
			enterprise: curEnv.enterprise,
		});
	console.log(wallet);
	return wallet;
}

async function createAddress() {
	await bitgo.unlock({ otp: "000000" });

	const wallet = await bitgoCoin
		.wallets()
		.get({id : '63edc1b9e165b900071e1252edf64b4e'});
	console.log("wallet id: " + wallet.id());
	const address = await wallet.createAddress();
	console.log(address);
}

async function sendTx() {
  // address : 0xa3dd3f4fd8ba72d069ecec59014aa91334e502fd
	await bitgo.unlock({ otp: "000000" });
	const wallet = await bitgoCoin
		.wallets()
		.get({id : '63edc1b9e165b900071e1252edf64b4e'});

	const tx = await wallet.send({
		address: '0xa3dd3f4fd8ba72d069ecec59014aa91334e502fd',
		amount: 1,
		walletPassphrase: password,
		type: 'transfer'
	});
	console.log(tx);
}

async function main() {
	await sendTx();
}
main().catch((e) => console.error(e));
