import { BitGo, BitGoAPIOptions } from '@bitgo-beta/bitgo';
import { Tpolygon } from '@bitgo-beta/sdk-coin-polygon';
import {Tsol } from '@bitgo-beta/sdk-coin-sol';
import { BackupProvider } from "@bitgo-beta/sdk-core/dist/src/bitgo/wallet";

/**
 * user: pengyuchen@bitgo.com
 * enterprise:  Nitro Test 63dabf5a1cd73e00073f2a7c50971485
 * enterprise: blockchain OS 61ba62d1033dc50008ac9c00dbb34c50
 */
const test: BitGoAPIOptions = {
	env: "test",
	//customRootURI: 'https://app.bitgo-test.com',
	accessToken: 'v2xa0b4544f08d28fc12c0b247ecdbeb0c3db16942433a9b49b72e8948f50205d52'
};

/**
 * user: pengyuchen@bitgo.com
 * enterprise: 63dc9e77b61fa400079bd6a1ee570048
 */
const dev: BitGoAPIOptions = {
	env: "dev",
	customRootURI: 'https://app.bitgo-dev.com',
	accessToken: 'v2x972d8963ed1393fd82c60a68da3f8a998f3f05714f0fbcb7f1e99fb2e2da8e51'
};

const enterprise = {
	test: "63dabf5a1cd73e00073f2a7c50971485",
	dev: "63dc9e77b61fa400079bd6a1ee570048",
};

const curEnv:BitGoAPIOptions = test;

const bitgo = new BitGo(curEnv);
const coin = 'tpolygon';
bitgo.register(coin, Tpolygon.createInstance);

// const coin = 'tsol';
// bitgo.register(coin, Tsol.createInstance);

async function main() {
	const bitgoCoin = bitgo.coin(coin);
	console.log("\n\ncreating wallet, this might take a few seconds....");
	await bitgo.unlock({ otp: "000000" });

	const res = await bitgoCoin.keychains().createMpc({
		multisigType: 'tss',
		passphrase: '12345',
		enterprise: enterprise[curEnv.env],
	});
	console.log(res);

	console.log(res.bitgoKeychain.keyShares);

}
main().catch((e) => console.error(e));
