import * as testEnv from '../env/envTest';
import { Ecdsa, ECDSAMethods, KeyIndices, sjcl } from "@bitgo-beta/bitgo";
import * as openpgp from 'openpgp';
import assert from "assert";
import { bip32 } from '@bitgo-beta/utxo-lib'
import bs58 from 'bs58';

const backupGpgKeyEncrypted = "{\"iv\":\"WDRcorvr9skixDtcHGbeHA==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"NGL8wmGqbxA=\",\"ct\":\"IJyiU0+AN6EsbEu5wx6SSDKCKNQuNCOrrjxCGLjyU84Zcct38XjliqM6WNelpFPApO/2rZfLnx5aL48ckMw9nCbJM+pPQgSPejenoqZgKtfsQy3UhWe5XgfA/37LxeBOKZaacsexAYhvgwPIokCAlrOKbTUj8rRNY04P2AJDiXUGdLD+E78kqutrdcDOgwAliNvT+EEo8Dy2iRaAjc/qGpYb+c9yvEfICOII9sIE4ULLKg+gURJfOz5BwzL6UsgzrwQtF9reQx/De69oE54/vTx4lTdiHi7CKWbje9vEmU2EFqlpSkoJQpFtU5IxGezq+2xDh4A36+L+JuC2aw+uTCg6fcFZVFP3h59mgP9NAdhNYKjEj0DUHCnKNNgEL2JTuTKcLyTbkjm/GX5WDiWUIuJOd2biz0cyQ6Fv8eYRJNSDGgyWCFCSJWd55EIiwn0x8OaeyD4h/ZTflYv1o1DWwMJB8lAqCnkukzzYwfntKWA7MPV5NOfhKClkR2r5iunan+78DoccMU8C1J2jXth5kYYtwxKfQl7ng6P2ru0W+kt8E6/tsPvc2dwjgXm7J9APAVPoAD0/Gjpn8481SXKuDjGDM8XKLqCdZUmJM74s7dIHebV6Jt/u3Elh0drlqY4NwQONCGUl3fAYq5GrwzNX80aapW0H6a03O6i1ZRWeJBmDeLrKWE8rKCXC9hAwD63uxvB6iiHDFElIDdalfgrwCerWLIu2wHrtibtw/b+5dlh/HCtgpTGdrKGMBvTNrOC4epUZ5H+OGRlbMKFoQkRNqQ2JTfRaZVZoC1SyAUqAKKPLhmerrpXsJ8/Uluv58uBjxeTCfl8QNtK5Yme5UVKjHf3mByrJaJ/lT82LdtI0BvpRs8vJFK1v8DVE/8e0MaVfiHO32sC1VGLSJWR7753BgBFo+dRQ++nIQTibgKWALcYrOWISwIfqCXCkm1EIyb0YTrSaaM1s00M8lapJJOY8Pne2vY7wIXtDc/ACXgmAwnyROi5n3Z4oGo+gAdQuR9w8kGiWtq8i99V+Hgv6ZWbzln4FvIWrg0zAFcwXG0OtzgkoVQk/ZW0Y4vTcXCkeGHRhtip7aKnWFrQxdaQjS6/4ykT/LvUdX0tj93+SqcaeJZMo2ruuoD8Valxui8U0Vtw1tHNLFyIZ70Lb4VhQudXXwDV+kzlHqNjHsyqAX2uGPdO5/JpnWAGo\"}";
const backupKeyshareEncrypted = "{\"iv\":\"7/ehNBmFTq2LqgoQAWUK2g==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"NGL8wmGqbxA=\",\"ct\":\"Fo9motgkAVKg+eEbWoT2e8qtnYbXe0zj1BPwxMej/G7E4td0SygdYUdNuHLxKwtp3AzYcJZtvU7a0gU+lOBxrrwS/SLhK7BbpPeG/+tRm/k54SooD7HA6itYdG5rHJ0HD/OE1ZdCoWYqWQAeg6hB6yPiem+DIYFy2e9A8PAZWbdMkpP4RA5Txm+sxbCve9reowSOkbMUNoruQouaAKUpnORaCRriz/AM2GyVI5i1gZjDWVGYuFISq9aZ6jD1mkXWX+p5ygMtvjo=\"}";
const userToBackupShare =     {
		"from" : "user",
		"to" : "backup",
		"publicShare" : "025c9e686c8c70c28ea2ef11b101c16228678cd18245916591b16fe088ce8886b76b43fc35c46d9aa59650f85adec81d91eba8c9b0f6822b7e963ec10281c319f8",
		"privateShare" : "-----BEGIN PGP MESSAGE-----\n\nwX4D3sLys7OXdecSAgMEMOoYqWKcicXXU8TwXa+JVwmY9MAQgJPQuDRdcVyk\nseOh74GpSl8DcdExN5TYhFFvVbRFCVZg5zgj5BrmTxqffDDE/kxzY6hGnYXK\nk3fItTVW1/I0iChBQrGBScrRrz/a8IEPo0qT/f5mltJ4scnthdHSoAFMk1KT\nCdV9ZvrfcbokjYJXMcWPsUdLhAbTj4BTQvsI8QbfkmZQtO/fOQAC8LJgR7vq\nPzWY9Mf8mIaGgRYFktLX8Qmj208dG/xLxFAQw2X1E7UEn3yCt6RvyxATPKvC\nUVejoAlmo1Yy2eSY3BfloWiIKpljwv/0pJjAaentk7w93OP2SDOWZtN17uIR\nbKl+9d8ujIQkYvszSET77oNBZHY=\n=9quX\n-----END PGP MESSAGE-----\n",
		"privateShareProof" : "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nxk8EZAEeAhMFK4EEAAoCAwQYNcItdM+COg9sQjx255fuA7wfNZlgdyM36Hu1\ngs3GQCJfDUfWXjXYtOaJyGzTYxjMlVb1HQQOD302RHvI85/KzVUwMWZlMmRm\nYTExZmY4MzhmODNmMGI5MzIgPHVzZXItMDFmZTJkZmExMWZmODM4ZjgzZjBi\nOTMyQDAxZmUyZGZhMTFmZjgzOGY4M2YwYjkzMi5jb20+wowEEBMIAB0FAmQB\nHgIECwkHCAMVCAoEFgACAQIZAQIbAwIeAQAhCRCDU3VlntnUqRYhBN+TJUEd\nYAwWKqeFaYNTdWWe2dSpsHgBAOxLVudeZEtZqmNKFdWaFVH9LU/xhcp8tGOi\nU6s1IA5rAQC7mOuaEu3CRUNl3k6+LGrjKZPlMyINzZ+JlJmtUu4n1s5TBGQB\nHgISBSuBBAAKAgMEU1ohFsSLQ6emJHWUNHuwGtEH8fOY8blHIM6j/yYbEPPG\n1wFckiD/OWMDiwpobrATvKDAfaBfksWpCiOGegv3GwMBCAfCeAQYEwgACQUC\nZAEeAgIbDAAhCRCDU3VlntnUqRYhBN+TJUEdYAwWKqeFaYNTdWWe2dSpHwQA\n/RE33zm9B/gmdnwvjxTrbx7eSUC/LRiO3TZ94OvoWisJAQC1UdqwFRnv7sEd\np3JW4g6bTpSVjGDaCGZTX9CNhXvxNs5PBGQBHgMTBSuBBAAKAgMEtHzBSzK4\ncJ1U+gF3QB7W0/EWUAkveYLYDtlNzePbgt+8o/99wJOdv0tydl81uy9zEbE3\nL0W2tMZFA+7DNy3MQcJ4BBgTCAAJBQJkAR4DAhsgACEJEINTdWWe2dSpFiEE\n35MlQR1gDBYqp4Vpg1N1ZZ7Z1Kkd1gD/b6nhthIovKTJJaKMjYDE0dvTveT+\nJ3XYHrAVywN5jL4A/39CpUOsufo2K2/zOfchmIsAZ8L/AxedAUJ+ZgQBvjeT\n=pew1\n-----END PGP PUBLIC KEY BLOCK-----\n",
		"vssProof" : "03c089c2ae4c7c524b516e507746f2c83c9d94c656da759d322212804c8a5f3402"
	};
const bitgoToBackupShare =     {
	"from" : "bitgo",
	"to" : "backup",
	"publicShare" : "02359df82a5e162c7437f23caea92ccad3bef9706c188608e728d719776ebbddff7e120071522daee6e681f400389f7736a951a80196b72f113991f6fc9b8c0744",
	"privateShare" : "-----BEGIN PGP MESSAGE-----\n\nwX4D3sLys7OXdecSAgMERzefvACTYK4F14EcAZqJTG+m92Aif7aktXuZSWN3\nwMY29lWi/uKXZTCD9R7BDyEMM0JC4hA1bM/6VlLLjvXSujBsuvTA2KoLGMDs\nUuVq2He1Xex/tj7PnFjatu0uGlyS8Ww4Gw4zNlWM3Jay3gtkxcTSsQG57JcG\na5HnWdSa7pN96kDHFYxCTJ5FbI6UJ4r5XE0PGeuUdeoKKPEniaiWzA0O6liS\n+GcdVFkSGVpyHRgcPiKtgJVaxRzEWLMZpeY1iinwtjzcNdDR8Cylc6pce6kH\n/LMMS2F21wMi8BghtFxQ8+4UO4ka44G88yE0Lwk4pbeHMLN+j1qKWZtj75Dm\nYjvASA8pTX2OqRL/NVzYWv5PQH4qAXc+I4ITXK92qB5ucbTy4A==\n=G4IL\n-----END PGP MESSAGE-----\n",
	"vssProof" : "03cfb5678f6b4c7f7d8243a2596ebb3e65b05d11e72544cc8d12fd775026711af9"
};

const backupPassword = 'Hello12345!!!#$%^';

const commonKeychain = '0321bbe4a0b0ce71ca9d7f322163ea868e35cff0576799cbf4d7dc72d76bc10b65090e52a447ff757352f3e36cb05da3ed98cb853b7cc757fba1ec5631fc4a978b';

async function main() {
	console.log("commonkeychain " + commonKeychain);

	const backupSeedDecrypted = sjcl.decrypt(backupPassword, backupKeyshareEncrypted);
	const backupGpgKey = await openpgp.readKey({ armoredKey: sjcl.decrypt(backupPassword, backupGpgKeyEncrypted) });

	const MPC = new Ecdsa();
	const backupKeyShare = await MPC.keyShare(2, 2, 3, Buffer.from(backupSeedDecrypted.slice(0, 128), 'hex'), true);

	const userToBackupPriv = await openpgp.decrypt({
		message: await openpgp.readMessage({
			armoredMessage: userToBackupShare.privateShare
		}),
		decryptionKeys: [backupGpgKey as openpgp.PrivateKey]
	});

	const userPrivateShare = bs58.decode(userToBackupPriv.data).toString('hex').slice(92, 156);

	const bitgoToBackupPriv = await openpgp.decrypt({
		message: await openpgp.readMessage({
			armoredMessage: bitgoToBackupShare.privateShare
		}),
		decryptionKeys: [backupGpgKey as openpgp.PrivateKey]
	});

	const combinedKey = MPC.keyCombine(backupKeyShare.pShare, [
		{
			i: 1,
			j: 2,
			n: '',
			u: userPrivateShare,
			y: userToBackupShare.publicShare.slice(0, 66),
			v: userToBackupShare.vssProof,
			chaincode: userToBackupShare.publicShare.slice(66, 130),
		},
		{
			i: 3,
			j: 2,
			n: '',
			u: bitgoToBackupPriv.data.toString().slice(0, 64),
			y: bitgoToBackupShare.publicShare.slice(0, 66),
			v: bitgoToBackupShare.vssProof,
			chaincode: bitgoToBackupShare.publicShare.slice(66, 130),
		}
		]
	);

	const combinedKeyCommonKeychain = combinedKey.xShare.y + combinedKey.xShare.chaincode;
	console.log("commonkeychain " + combinedKeyCommonKeychain);
	assert(combinedKeyCommonKeychain === commonKeychain);

	console.log("done");
	// find *-to-backup shares in the BackupKey collection in mongodb
	// by the key id associated with the wallet wallet.keyIds()[KeyIndices.BACKUP]
	//const backupShares = env.bitgo.decrypt({input: b.encryptedPrv, password: '123456' });


}
main().catch((e) => console.error(e));
