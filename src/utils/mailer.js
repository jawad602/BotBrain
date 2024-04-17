import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "jawadjamil602@gmail.com",
        pass: "ccpj qztt dnhz fskr",
    },
});

export function generateSecurityCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code;
}

export default async function sendMail(user, subject) {
    try {
        const securityCode = generateSecurityCode();
        const mailOptions = {
            from: 'jawadjamil602@gmail.com', // sender address
            to: `${user.email}`, // list of receivers
            subject: `${subject}`,  // Subject line
            text: `${securityCode}`, // plain text body
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return {mailResponse: mailResponse, securityCode, securityCode};
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}