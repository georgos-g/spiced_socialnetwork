const aws = require('aws-sdk');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: 'eu-west-1',
});

exports.send = (to, subject, body) => {
    const emailPromise = ses    
        .sendEmail({
            Source: 'canary.ceiling@spicedling.email',
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Text: {
                        Data: body,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        }).promise().then(
            () => console.log('Mail sending worked!')
        ).catch(
            err => console.log(err)
        );
    return emailPromise;
};
