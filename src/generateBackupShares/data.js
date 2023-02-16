
const userGpgKey = {
	privateKey:
		'-----BEGIN PGP PRIVATE KEY BLOCK-----\n' +
		'\n' +
		'xXQEY+HCgxMFK4EEAAoCAwSwhfdvV4/vT+S33XHRjn03J7InbkPhuRQCJ0oP\n' +
		'eWVsTifVB4dW/AForv+WjedcIk6EmAdZO2TtcOl+F7W71zFvAAD+KQP7rnOM\n' +
		'yE3hJD4txlnGrokhJBEcW56fphAo0Xm5zMMP7c0kdGVzdEBiaXRnby5jb20g\n' +
		'PHVzZXItdGVzdEBiaXRnby5jb20+wowEEBMIAD4FAmPhwoMECwkHCAkQ22G9\n' +
		'FEQUuPsDFQgKBBYAAgECGQECGwMCHgEWIQTkt7VWECj5P/ueKM/bYb0URBS4\n' +
		'+wAASiMA/1vdiO5/8wk75IhNlrHJ2hHIMEjTgkMyR5cs7ctifP89AP44PhKe\n' +
		'fUFeEClGgZR68P3DQLlxRdzE9Id3O3jAvX8decd4BGPhwoMSBSuBBAAKAgME\n' +
		'lnZJfEHFq58BiOASS+iPpGLqTpEQUA8n5kh1/DSAHVH5K3ml+YjzuReVDBTF\n' +
		'4MJB7ShUJmjDYh+NergHnoOkcAMBCAcAAP9Ojwa0YQ4O2lzhprS1O+jca3MA\n' +
		'OhxcvmqhgliIeftD3hCIwngEGBMIACoFAmPhwoMJENthvRREFLj7AhsMFiEE\n' +
		'5Le1VhAo+T/7nijP22G9FEQUuPsAANuIAP94j0+Uq/L9D1WsbNV4C/KhVbEl\n' +
		'eFH0L6tvMB3iV5Z5QQEAyrE7C2M4qrl/LWyr43UORW78fM8oab2d/NFZ+f6T\n' +
		'JxM=\n' +
		'=O9Iq\n' +
		'-----END PGP PRIVATE KEY BLOCK-----',
	publicKey:
		'-----BEGIN PGP PUBLIC KEY BLOCK-----\n' +
		'\n' +
		'xk8EY+HCgxMFK4EEAAoCAwSwhfdvV4/vT+S33XHRjn03J7InbkPhuRQCJ0oP\n' +
		'eWVsTifVB4dW/AForv+WjedcIk6EmAdZO2TtcOl+F7W71zFvzSR0ZXN0QGJp\n' +
		'dGdvLmNvbSA8dXNlci10ZXN0QGJpdGdvLmNvbT7CjAQQEwgAPgUCY+HCgwQL\n' +
		'CQcICRDbYb0URBS4+wMVCAoEFgACAQIZAQIbAwIeARYhBOS3tVYQKPk/+54o\n' +
		'z9thvRREFLj7AABKIwD/W92I7n/zCTvkiE2WscnaEcgwSNOCQzJHlyzty2J8\n' +
		'/z0A/jg+Ep59QV4QKUaBlHrw/cNAuXFF3MT0h3c7eMC9fx15zlMEY+HCgxIF\n' +
		'K4EEAAoCAwSWdkl8QcWrnwGI4BJL6I+kYupOkRBQDyfmSHX8NIAdUfkreaX5\n' +
		'iPO5F5UMFMXgwkHtKFQmaMNiH416uAeeg6RwAwEIB8J4BBgTCAAqBQJj4cKD\n' +
		'CRDbYb0URBS4+wIbDBYhBOS3tVYQKPk/+54oz9thvRREFLj7AADbiAD/eI9P\n' +
		'lKvy/Q9VrGzVeAvyoVWxJXhR9C+rbzAd4leWeUEBAMqxOwtjOKq5fy1sq+N1\n' +
		'DkVu/HzPKGm9nfzRWfn+kycT\n' +
		'=KBx8\n' +
		'-----END PGP PUBLIC KEY BLOCK-----'
};

const newKeyBodies = {
	dev: {
		userGpgPublicKey: userGpgKey.publicKey,
		bitgoGpgKeyPair: {
			publicKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\n' +
				'\r\n' +
				'xk8EYrNNXRMFK4EEAAoCAwRMQs/2gbkvaiLY1UCTppqp6MEmfLLoALSMAFI3\r\n' +
				'Yx0o94rvJp4aDytcsR1igyimKh+iXv0eaYiahadoAvbfY2UizRNoc20gPGhz\r\n' +
				'bUBsb2NhbGhvc3Q+woQEExMIABUFAmKzTV0CCwkCFQgCFgACGwMCHgEAIQkQ\r\n' +
				'TPHD2y/V+V4WIQSdvd65tR+kTsrR8KxM8cPbL9X5Xt4jAPsEMnqXX8DIk83B\r\n' +
				'Hr8KveAKcYNseZ5HC54OZPeH6wWceAD/V6eRa6QqfS95a4f4h6jLMYo0aRj/\r\n' +
				'CGLJEVUQzZbkR7XCdQQQEwgABgUCYrNNXQAhCRAa6Pbo0kY0JxYhBPK08jlA\r\n' +
				'udBt/WhmGhro9ujSRjQn00IA/ibjLf84oeRvp+JYBEH2LdC43/JLL91g6DzI\r\n' +
				'PoCTwk+rAP0Wj5HMJHkxGwwo3CRjvsyrrGo7Q0etyyGmr3yNmeMPns5TBGKz\r\n' +
				'TV0SBSuBBAAKAgMELHOedAmBYpEds41spOMlfuMLAtqhxIGh6bpmef+r+/Vu\r\n' +
				'GLS5Ufl+HWXgbvIc5UzrIKXF0nlL+/m72Mxa5uqRqAMBCAfCeAQYEwgACQUC\r\n' +
				'YrNNXQIbDAAhCRBM8cPbL9X5XhYhBJ293rm1H6ROytHwrEzxw9sv1flemi4A\r\n' +
				'/RGNO5u6MauQKGbh7yRnEBUkYzdGi1rm+FAOvv/LjBbGAP98nhi9G/WK9g9V\r\n' +
				'AkpIbAzjDq4fZJ6sHLzPsvuZth1OzA==\r\n' +
				'=sDTx\r\n' +
				'-----END PGP PUBLIC KEY BLOCK-----\r\n',
			certKeyEncryptedXprv:
				'{"iv":"8hb3LmPaWB4R2GiVBQ==","ts":64,"ct":"sFzPWKI0XeAnCFJQve31W9eM03ndvyc+LCER8eykR0HrQmMu6ZEgkp4subN4Z3gGKg2F/7j9HximvBYodB+ENLhnCfmh4dpendrqQSMUAOLcmx32ULP3M7t1TMOoNqfpAlSZZrvZNB+SWqQ3FTKH69qKRtg1BSc="}',
			encKeyEncryptedXprv:
				'{"iv":"x0UeogJAdCj9GEPd7g==","ts":64,"ct":"Quq/2Z1maz/JmOGyF1ugE2NYEN7utmY4r3dM5UwLsCvSXurnJDRQTfC6mFSBhorpWzNltKWIr80TlfSqjf+VpMmWWlQjn+d97iyZB5T03V/UOgKJHUJd/sqXHrwt7szXxumyJLO8cMgw1VU1dNwPhV7Y1bqBoyg="}'
		}
	},
	test: {
		userGpgPublicKey: userGpgKey.publicKey,
		bitgoGpgKeyPair: {
			publicKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\n' +
				'\r\n' +
				'xk8EYqEU5hMFK4EEAAoCAwQDdbAIZrsblEXIavyg2go6p9oG0SqWTgFsdHTc\r\n' +
				'BhqdIS/WjQ8pj75q+vLqFtV9hlImYGInsIWh97fsigzB2owyzRhoc20gPGhz\r\n' +
				'bUB0ZXN0LmJpdGdvLmNvbT7ChAQTEwgAFQUCYqEU5wILCQIVCAIWAAIbAwIe\r\n' +
				'AQAhCRCJNRsIDGunexYhBHRL5D/8nRM3opQnXok1GwgMa6d7tg8A/24A9awq\r\n' +
				'SCJx7RddiUzFHcKhVvvo3R5N7bHaOGP3TP79AP0TavF2WzhUXmZSjt3IK23O\r\n' +
				'7/aknbijVeq52ghbWb1SwsJ1BBATCAAGBQJioRTnACEJEAWuA35KJgtgFiEE\r\n' +
				'ZttLPR0KcYvjgvJCBa4DfkomC2BsrwD/Z+43zOw+WpfPHxe+ypyVog5fnOKl\r\n' +
				'XwleH6zDvqUWmWkA/iaHC6ullYkSG4Mv68k6qbtgR/pms/X7rkfa0QQFJy5p\r\n' +
				'zlMEYqEU5hIFK4EEAAoCAwSsLqmfonjMF3o0nZ5JHvLpmfTA1RIVDsAEoRON\r\n' +
				'tZA6rAA23pGl6s3Iyt4/fX9Adzoh3EElOjMsgi8Aj3dFpuqiAwEIB8J4BBgT\r\n' +
				'CAAJBQJioRTnAhsMACEJEIk1GwgMa6d7FiEEdEvkP/ydEzeilCdeiTUbCAxr\r\n' +
				'p3vM7AD9GPp6HhYNEh2VVCDtFSt14Bni5FVM5icpVDo6w9ibvWAA/2Ti3Jv4\r\n' +
				'IhIxl81/wqAgqigIblrz6vjtagr9/ykXQCW3\r\n' +
				'=skCo\r\n' +
				'-----END PGP PUBLIC KEY BLOCK-----\r\n',
			certKeyEncryptedXprv:
				'{"iv":"WpU7yPtX0YjXhGtaXQ==",' +
				'"ts":64,' +
				'"ct":"1LKstbFr/mFs/rRTPUYSfEZyaSwNyE8S+EGkFiRB8wB3kTnlXtwufV4L+T+oSekBur9FhUCUGBLe1VEy5U92dUQBE/iNW2Z6YEVsXgRBXnFoLg8cc2jVnmGY1XqpvXcjXWoTwSCDexcE1lnaPb0a7mkr5L5gb2w="}',
			encKeyEncryptedXprv:
				'{"iv":"7R2rvZ9S9TnO9WbxPA==",' +
				'"ts":64,' +
				'"ct":"NwpIfo0nPfz1HV2AHJWRtbbNL4G/pCd10tTPMLMx8NN6iEzfEcYx3i5OT+JO/c+yZQDcLv6zLMbeC51E1PX1R/9w/GKgBq/muOCaz5nccBfD8YLGOzjp2CQQ9mBEhTTzRG7bv7/4cgkhGPbC7EoyEWcRwO3XE4Y="}'
		}
	}
};

export {userGpgKey, newKeyBodies};
