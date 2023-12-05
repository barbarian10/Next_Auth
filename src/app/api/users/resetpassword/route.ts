import { connect } from '@/dbConfig/dbConfig'
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody

        const user = await User.findOne({ email })
        console.log(user)
        if (user) {
            // Send an email with the reset token
            await sendEmail({ email, emailType: 'RESET', userId: user._id });

            // Send a generic response to avoid exposing information about the user's existence
            return NextResponse.json({
                message: 'Reset email sent if the user exists',
                success: true,
                user
            });
        }
        return NextResponse.json({ message: 'Reset email sent if the user exists' });
    } catch (error: any) {
        console.error('Error in resetpassword API route:', error);
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}