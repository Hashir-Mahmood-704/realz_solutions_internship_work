const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMSToNumber = async (number) => {
    const msgOptions = {
        from: process.env.TWILIO_PHONE_NUM,
        to: number,
        body: "Hello, this is message from Hashir"
    };
    try {
        const res = await client.messages.create(msgOptions);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
};

const sendCallToNumber = async (number) => {
    const callOptions = {
        from: process.env.TWILIO_PHONE_NUM,
        to: number,
        twiml: `<Response>
        <Say>I am a good man, this is code red, i repeat</Say>
        </Response>`
    };
    try {
        const res = await client.calls.create(callOptions);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { sendCallToNumber, sendSMSToNumber };