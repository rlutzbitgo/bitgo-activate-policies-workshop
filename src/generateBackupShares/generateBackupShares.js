import {userGpgKey, newKeyBodies} from './data.js';
import 'superagent';
import request from "superagent";
import * as pgp from 'openpgp';

async function decrypt(privateKey, encryptedU) {
	const message = await pgp.readMessage({ armoredMessage: encryptedU });
	const decrypted = await pgp.decrypt({message: message, decryptionKeys: [privateKey]});
	return decrypted.data;
}

async function decryptShareU(privateKey, body) {
	const backupToUserShareU = await decrypt(privateKey, body.backupToUserShare.u);
	console.log({
		backupToBitgoShare: {
			i: 3,
			j: 2,
			publicShare: body.backupToBitgoShare.y,
			privateShare: body.backupToBitgoShare.u,
			privateShareProof: body.backupToBitgoShare.uSig,
			vssProof: body.backupToBitgoShare.v,
		},
		backupToUserShare: {
			i: 1,
			j: 2,
			publicShare: body.backupToUserShare.y,
			// in plain text
			privateShare: backupToUserShareU,
			privateShareProof: body.backupToUserShare.uSig,
			vssProof: body.backupToUserShare.v
		},
		encryptedBackupShare: body.encryptedBackupShare
	});
}

async function main() {
	const body = newKeyBodies.dev;
	const privateKey = await pgp.readPrivateKey({armoredKey: userGpgKey.privateKey});
	const res = await request.post("http://localhost:6921/newkey")
		.accept("application/json")
		.send(body);

	await decryptShareU(privateKey, res.body);


}
main().catch((e) => console.error(e));
