import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        console.log("Sending email to:", email); // Add this line
        //create a hashed token
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        //create a transporter

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        }

        const transport = nodemailer.createTransport({
            host: "gmail",
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASS
            }
        });
        
        const mailOptions = {
            from: 'mrteddybad@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ?
                "Verify your email"
                :
                "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ?
                "verifyemail"
                :
                "resetpassword"}?token=${hashToken}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ?
                    "verifyemail"
                    :
                    "resetpassword"}?token=${hashToken}
            </p>`
        }
        console.log("Mail Options:", mailOptions);
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
