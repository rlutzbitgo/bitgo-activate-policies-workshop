import * as testEnv from '../env/envTest';
import {ECDSA, Ecdsa, ECDSAMethods, KeyIndices, sjcl} from "@bitgo-beta/bitgo";
import * as openpgp from 'openpgp';
import bs58 from 'bs58';
import {Hash} from "crypto";
import { addHexPrefix, BN } from 'ethereumjs-util';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import Common from '@ethereumjs/common';
import createKeccakHash from 'keccak';

// this is the test trust private key encrypted
const backupGpgKeyEncrypted = "{\"iv\":\"WDRcorvr9skixDtcHGbeHA==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"NGL8wmGqbxA=\",\"ct\":\"IJyiU0+AN6EsbEu5wx6SSDKCKNQuNCOrrjxCGLjyU84Zcct38XjliqM6WNelpFPApO/2rZfLnx5aL48ckMw9nCbJM+pPQgSPejenoqZgKtfsQy3UhWe5XgfA/37LxeBOKZaacsexAYhvgwPIokCAlrOKbTUj8rRNY04P2AJDiXUGdLD+E78kqutrdcDOgwAliNvT+EEo8Dy2iRaAjc/qGpYb+c9yvEfICOII9sIE4ULLKg+gURJfOz5BwzL6UsgzrwQtF9reQx/De69oE54/vTx4lTdiHi7CKWbje9vEmU2EFqlpSkoJQpFtU5IxGezq+2xDh4A36+L+JuC2aw+uTCg6fcFZVFP3h59mgP9NAdhNYKjEj0DUHCnKNNgEL2JTuTKcLyTbkjm/GX5WDiWUIuJOd2biz0cyQ6Fv8eYRJNSDGgyWCFCSJWd55EIiwn0x8OaeyD4h/ZTflYv1o1DWwMJB8lAqCnkukzzYwfntKWA7MPV5NOfhKClkR2r5iunan+78DoccMU8C1J2jXth5kYYtwxKfQl7ng6P2ru0W+kt8E6/tsPvc2dwjgXm7J9APAVPoAD0/Gjpn8481SXKuDjGDM8XKLqCdZUmJM74s7dIHebV6Jt/u3Elh0drlqY4NwQONCGUl3fAYq5GrwzNX80aapW0H6a03O6i1ZRWeJBmDeLrKWE8rKCXC9hAwD63uxvB6iiHDFElIDdalfgrwCerWLIu2wHrtibtw/b+5dlh/HCtgpTGdrKGMBvTNrOC4epUZ5H+OGRlbMKFoQkRNqQ2JTfRaZVZoC1SyAUqAKKPLhmerrpXsJ8/Uluv58uBjxeTCfl8QNtK5Yme5UVKjHf3mByrJaJ/lT82LdtI0BvpRs8vJFK1v8DVE/8e0MaVfiHO32sC1VGLSJWR7753BgBFo+dRQ++nIQTibgKWALcYrOWISwIfqCXCkm1EIyb0YTrSaaM1s00M8lapJJOY8Pne2vY7wIXtDc/ACXgmAwnyROi5n3Z4oGo+gAdQuR9w8kGiWtq8i99V+Hgv6ZWbzln4FvIWrg0zAFcwXG0OtzgkoVQk/ZW0Y4vTcXCkeGHRhtip7aKnWFrQxdaQjS6/4ykT/LvUdX0tj93+SqcaeJZMo2ruuoD8Valxui8U0Vtw1tHNLFyIZ70Lb4VhQudXXwDV+kzlHqNjHsyqAX2uGPdO5/JpnWAGo\"}";
// this is the initial seed value used to produce the trust backup share
const backupKeyshareEncrypted = "{\"iv\":\"7/ehNBmFTq2LqgoQAWUK2g==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"NGL8wmGqbxA=\",\"ct\":\"Fo9motgkAVKg+eEbWoT2e8qtnYbXe0zj1BPwxMej/G7E4td0SygdYUdNuHLxKwtp3AzYcJZtvU7a0gU+lOBxrrwS/SLhK7BbpPeG/+tRm/k54SooD7HA6itYdG5rHJ0HD/OE1ZdCoWYqWQAeg6hB6yPiem+DIYFy2e9A8PAZWbdMkpP4RA5Txm+sxbCve9reowSOkbMUNoruQouaAKUpnORaCRriz/AM2GyVI5i1gZjDWVGYuFISq9aZ6jD1mkXWX+p5ygMtvjo=\"}";
// this is the box A value from the key card
const encryptedUserKey = "{\"iv\":\"Rn63xEBmewdZs6GMQ2Awdg==\",\"v\":1,\"iter\":10000,\"ks\":256,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"KcHcJ6uL+5o=\",\"ct\":\"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\"}";
// this is the box D value from the key card
const encryptedWalletPassword = '{"iv":"ubd9kJS85a8hwnrPeatB2w==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"9IqB2en8D7U=","ct":"29qdba+GNsxiy+d/"}';
// this is key used to encrypt the wallet password to produce the box D value
const passcodeEncryptionCode = '654321';
// this is the wallet password
const walletPassword = 'abcd';
// this is the password to decrypt the test trust private key and seed
const backupPassword = 'Hello12345!!!#$%^';

// this actually isn't needed because we must key derive the user share
// const userToBackupShare =     {
//     "from" : "user",
//     "to" : "backup",
//     "publicShare" : "03b25a65fd9b2861fdd3183a341e18cbc880792e578fd1ea8e07d7d0876d55627058fd610984bc2efb5882cffa5b3f7b58c261fa882578cb3293985252577a3291",
//     "privateShare" : "-----BEGIN PGP MESSAGE-----\n\nwX4D3sLys7OXdecSAgMELFYy1Pv90erOpiPhzt/3FVSrMqPkozkNtmx9Dcsh\nRevHssAya9WQ1FV3cTVQEo3Et4Hi3HV2w0zTHWN08ZYqkzDNcHD4puYYXpWt\nBDHGz1ujhLgmwN+VJdCl5Tw0F97reByrzHNeAAJZUBA/PGx9LUrSoAFMaHGD\nBeyYsCAjnso7ubLpnClRnEtliOIGn2qqit00pejH7YgrHhrudnA1Pu5Db2El\nxt/L9aNOzM0mg9vJvxT1w2EPdiNVGqn9VI7SDKF++L6VjOeoRnYo5sterWOq\nhP2FqiJd9ucmNyw5cthdVL/peoc0O4koOBcwgtxvqktye3IjlyDhkwJ7W5to\nP4E4VsIAwrAT4Q90fqaxjDNNDi4=\n=SCOt\n-----END PGP MESSAGE-----\n",
//     "privateShareProof" : "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nxk8EZAnZHRMFK4EEAAoCAwQ4Tn3GiaSCi25gU1cIlFT2GGNh4d5jhoNkkK0v\ndHRb2rb9aL+sR9UcAMFI8yIGBW+xVJ9juXfiPtOBr25aTSVszVUxZjkzYzU0\nY2I5OTNjODJlNjIyZGU2Y2MgPHVzZXItMWY5M2M1NGNiOTkzYzgyZTYyMmRl\nNmNjQDFmOTNjNTRjYjk5M2M4MmU2MjJkZTZjYy5jb20+wowEEBMIAB0FAmQJ\n2R0ECwkHCAMVCAoEFgACAQIZAQIbAwIeAQAhCRCL6ZpDlMmX9BYhBFJV2A/7\nK0/dbcBZvovpmkOUyZf0wCcA/3Qe4b5zg0lbTmZcC+sOnNrZzQyWXMBb4HEx\nnQnnycx2AP0f60Z31Mr5ajW2mepLykFRzJvTKbbweJr8CacuYHDNU85TBGQJ\n2R0SBSuBBAAKAgME9HSZlSu6avEhzthLrRfcxiDafma1BHzWShHMG6+H5vol\n+WXAUizbsMQrSrWLY6JWgGeF2E/SOj6YVgcP8zKtcAMBCAfCeAQYEwgACQUC\nZAnZHQIbDAAhCRCL6ZpDlMmX9BYhBFJV2A/7K0/dbcBZvovpmkOUyZf05FQA\n/RNZ8nOpLJfkrAVs8Bu8nB4uV2sSRpb8KVJYio4uFpybAQDitWR35IlCReoA\nWR5jEG58eaYRSI/m/Rr5Uh+ws1n1Ac5PBGQJ2R8TBSuBBAAKAgMEXzdEYwQj\njE0HhIQ9dnnc05yyTdIKKAg7Q4U3i/xusdqhNez93o5kkBur5WEBkUhMeuCR\noeDqTx7OD5UQo96uNcJ3BBgTCAAJBQJkCdkfAhsgACEJEIvpmkOUyZf0FiEE\nUlXYD/srT91twFm+i+maQ5TJl/S1PwD4tQjSgcVgd9hvCVa4ICUfzM0AztEY\nFaydN8dmFCAVjgEAhKzQ5cmiYxMw+/j0IiKObraZjCHT4s8TrrpfoA8kDlc=\n=q119\n-----END PGP PUBLIC KEY BLOCK-----\n",
//     "vssProof" : "022db3978d9071ab0f979b832dcd5409036975369bad33dd21e975fcfb6fb85a33"
// };

const bitgoToBackupShare =     {
    "from" : "bitgo",
    "to" : "backup",
    "publicShare" : "032a4eb1e88efb9a076673b38445ce5904463041596d8a246c6d3f0fb96cc5b81be8287f6eeb61e252173f692741b435a7278dc7403a84165908c03678bccc86d2",
    "privateShare" : "-----BEGIN PGP MESSAGE-----\n\nwX4D3sLys7OXdecSAgMEzktIOv4innfX7iOUwkw+47ZoYjnvbbmemSfHQfP/\nfqqU8QE2rCSj5FZHZjieOR9Cmb7/WyYdJSgFDOQgQUk5cDAD8iLaYsWfJnYl\nc+QI6HtH3fTQ1YRSIw+KQ6s6Pg58XgyPZYnwlQFSGi5PT6I1yuXSsQGh+ZT/\n9eceYesWKsZrPs7sfAzx8p2vN8pxhSDVAs3FHj5AxL2TN2zMfK8qVCxsoCBK\n+T30oHGuv05WRT0Xz+YWSuiE5dv0dQikNiWll0THgkjCkfm7+72HesVUMlvn\niJ9u05djZIwbBSw6SkwOn0Q9LO8MnJfvfUhXjZWSLQKqSGxm5TwZoKXfOj0q\njfR6lu9cg3DRQ/P1CO94TzKqJz+ijqAen5Fupv8WFfnBU7PHOA==\n=U4Wi\n-----END PGP MESSAGE-----\n",
    "vssProof" : "039792752f75591f6a39197efe330e44370efe0b36d749f05e7fa2995c4c33214a"
};

async function main() {
    const backupSeedDecrypted = sjcl.decrypt(backupPassword, backupKeyshareEncrypted);
    const backupGpgKey = await openpgp.readKey({ armoredKey: sjcl.decrypt(backupPassword, backupGpgKeyEncrypted) });

    const MPC = new Ecdsa();
    // recreate the backup share from the seed value
    const backupKeyShare = await MPC.keyShare(2, 2, 3, Buffer.from(backupSeedDecrypted.slice(0, 128), 'hex'), true);

    // the below isn't needed because again we must keyDerive on the user share to generate new values for these
    // const userToBackupPriv = await openpgp.decrypt({
    //     message: await openpgp.readMessage({
    //         armoredMessage: userToBackupShare.privateShare
    //     }),
    //     decryptionKeys: [backupGpgKey as openpgp.PrivateKey]
    // });
    //
    // const userPrivateShare = bs58.decode(userToBackupPriv.data).toString('hex').slice(92, 156);

    const bitgoToBackupPriv = await openpgp.decrypt({
        message: await openpgp.readMessage({
            armoredMessage: bitgoToBackupShare.privateShare
        }),
        decryptionKeys: [backupGpgKey as openpgp.PrivateKey]
    });

    const userShare = JSON.parse(sjcl.decrypt(walletPassword, encryptedUserKey));

    // Step One
    // signerOne, signerTwo have decided to sign the message
    // also, note that even though the path in the key collection says '/0/0' base addresses are created with a null path, this is a bug that should be fixed
    const signerOne = MPC.keyDerive(userShare.pShare, [userShare.backupNShare, userShare.bitgoNShare], '');
    const signerTwo = MPC.keyCombine(backupKeyShare.pShare, [
        signerOne.nShares[2], // importantly, this keyCombine must happen not with the original nShare from keycard, but with new nShare produced from keyDerive on the user share
            {
                i: 3,
                j: 2,
                n: backupKeyShare.nShares[3].n,
                u: bitgoToBackupPriv.data.toString().slice(0, 64),
                y: bitgoToBackupShare.publicShare.slice(0, 66),
                v: bitgoToBackupShare.vssProof,
                chaincode: bitgoToBackupShare.publicShare.slice(66, 130),
            } // this is the bitgo to backup nShare
        ]
    );
    const signerOneIndex = signerOne.xShare.i;

    // Step Two
    // Second signer generates their range proof challenge.
    const signerTwoWithChallenge: ECDSA.KeyCombinedWithNTilde = await MPC.signChallenge(
            signerTwo.xShare,
            signerTwo.yShares[signerOneIndex],
        );

    // Step Three
    // Sign Shares are created by one of the participants (signerOne)
    // with its private XShare and YShare corresponding to the other participant (signerTwo)
    // This step produces a private WShare which signerOne saves and KShare which signerOne sends to signerTwo
    const signShares: ECDSA.SignShareRT = await MPC.signShare(
        signerOne.xShare,
        signerTwoWithChallenge.yShares[signerOneIndex],
    );

    // Step Four
    // signerTwo receives the KShare from signerOne and uses it produce private
    // BShare (Beta Share) which signerTwo saves and AShare (Alpha Share)
    // which is sent to signerOne
    let signConvertS21: ECDSA.SignConvertRT = await MPC.signConvert({
        xShare: signerTwoWithChallenge.xShare,
        yShare: signerTwo.yShares[signerOneIndex], // YShare corresponding to the other participant signerOne
        kShare: signShares.kShare,
    });

    // Step Five
    // signerOne receives the AShare from signerTwo and signerOne using the private WShare from step two
    // uses it produce private GShare (Gamma Share) and MUShare (Mu Share) which
    // is sent to signerTwo to produce its Gamma Share
    const signConvertS12: ECDSA.SignConvertRT = await MPC.signConvert({
        aShare: signConvertS21.aShare,
        wShare: signShares.wShare,
    });

    // Step Six
    // signerTwo receives the MUShare from signerOne and signerOne using the private BShare from step three
    // uses it produce private GShare (Gamma Share)
    signConvertS21 = await MPC.signConvert({
        muShare: signConvertS12.muShare,
        bShare: signConvertS21.bShare,
    });

    // Step Seven
    // signerOne and signerTwo both have successfully generated GShares and they use
    // the sign combine function to generate their private omicron shares and
    // delta shares which they share to each other

    const [signCombineOne, signCombineTwo] = [
        MPC.signCombine({
            gShare: signConvertS12.gShare as ECDSA.GShare,
            signIndex: {
                i: (signConvertS12.muShare as ECDSA.MUShare).i,
                j: (signConvertS12.muShare as ECDSA.MUShare).j,
            },
        }),
        MPC.signCombine({
            gShare: signConvertS21.gShare as ECDSA.GShare,
            signIndex: {
                i: (signConvertS21.muShare as ECDSA.MUShare).i,
                j: (signConvertS21.muShare as ECDSA.MUShare).j,
            },
        }),
    ];

    // use ethereum-js to construct an unsigned transaction
    const tx = FeeMarketEIP1559Transaction.fromTxData({
        to: '0xff07a12ee165f0fac3048adb409ab314fcfb142c',
        value: new BN(1000000000006),
        nonce: new BN(0),
        maxPriorityFeePerGas: new BN(20000000000),
        gasLimit: new BN(21000),
        maxFeePerGas: new BN(100000000000),
    }, { common: new Common({ chain: 5, hardfork: 'london' }) });

    const MESSAGE = tx.getMessageToSign(false);

    console.log(`initial tx: ${JSON.stringify(tx)}`);

    // Step Eight
    // signerOne and signerTwo shares the delta share from each other
    // and finally signs the message using their private OShare
    // and delta share received from the other signer

    const hashGenerator = (hashType?: string): Hash | undefined => {
        return hashType === 'keccak256' ? createKeccakHash('keccak256') as unknown as Hash : undefined;
    };
    const [signA, signB] = [
        MPC.sign(MESSAGE, signCombineOne.oShare, signCombineTwo.dShare, hashGenerator('keccak256'), true),
        MPC.sign(MESSAGE, signCombineTwo.oShare, signCombineOne.dShare, hashGenerator('keccak256'), true),
    ];

    // Step Nine
    // Construct the final signature

    const signature = MPC.constructSignature([signA, signB]);

    // Step Ten
    // Verify signature

    const isValid = MPC.verify(MESSAGE, signature, hashGenerator('keccak256'), true);
    console.log(`Signature was valid: ${isValid}`);

    // apply the signature to our unsigned transaction so we can broadcast it
    const txSigned = FeeMarketEIP1559Transaction.fromTxData(
        {
            ...tx,
            r: addHexPrefix(signature.r),
            s: addHexPrefix(signature.s),
            v: new BN(signature.recid!),
        },
        { common: new Common({ chain: 5, hardfork: 'london' }) },
    );
    const decryptedWalletPassword = sjcl.decrypt(passcodeEncryptionCode, encryptedWalletPassword);
    console.log(`decrypted wallet password: ${decryptedWalletPassword}`);

    console.log(`signedTx: ${JSON.stringify(txSigned)}`);
    console.log(`serialized: ${txSigned.serialize().toString('hex')}`);
    console.log('wallet base address 0xe7917cb3fb945c981d446b2abf44d5236d6d5bd6');
    console.log(`senderAddress: ${txSigned.getSenderAddress().toString()}`);
    console.log(`signature: ${JSON.stringify(signature)}`);

}
main().catch((e) => console.error(e));
