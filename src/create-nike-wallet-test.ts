import { BitGo, WalletWithKeychains } from "../../BitGoJS/modules/bitgo";
import * as testEnv from './env/envTest';
const coin = 'tsol';
const env = testEnv;

const bitgoCoin = env.bitgo.coin(coin);
const walletPassword = '123456';

async function createWallet(): Promise<WalletWithKeychains> {
	console.log("creating wallet, this might take a few seconds....");

	const wallet = await bitgoCoin
		.wallets()
		.generateWallet({
			// label:  "multisig tss no version",
			// passphrase: walletPassword,
			// multisigType: 'tss',
			// //backupProvider: 'BitGoTrustAsKrs',
			// enterprise: env.enterpriseId,
			label: "Generated TSOL Wallet",
			passphrase: walletPassword,
			enterprise: env.enterpriseId,
			disableTransactionNotifications: "true",
			disableKRSEmail: true,
			multisigType: 'tss',
			passcodeEncryptionCode: "my random string"
		});
	console.log(wallet);
	return wallet;
}

async function createAddress(walletId: string): Promise<any> {
	const wallet = await bitgoCoin
		.wallets()
		.get({id : walletId});
	console.log("wallet id: " + wallet.id());
	const address = await wallet.createAddress();
	console.log(address);
	return address;
}

async function sendTx(fromWallet: string, toAddress: string) {
	await env.bitgo.unlock({ otp: "804855" });
	const wallet = await bitgoCoin
		.wallets()
		.get({id : fromWallet});

	const tx = await wallet.send({
		address: toAddress,
		amount: "1",
		walletPassphrase: walletPassword,
		type: 'transfer'
	});
	console.log(tx);
}

async function main() {
	await env.bitgo.authenticateWithAccessToken({
		accessToken: env.accessToken
	});

	const wallet = await createWallet();
	//const walletId = wallet.wallet.id();

	// const walletId = env.walletNitroKrsId;
	//
	// // const newAddress = await createAddress(walletId);
	// // const newAddressStr = newAddress.address;
	// const newAddressStr = env.newAddress;
	// console.log(`wallet id: ${walletId}  address: ${newAddressStr}`)
	// await sendTx(walletId, newAddressStr);

}
main().catch((e) => console.error(e));
