// Import necessary modules and dependencies
import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


// Connect to the database
connect();

// Function to fetch user data based on the token
async function fetchData(token: any) {
  // Find the user in the database based on the provided token
  const user = await User.findOne({ forgotPasswordToken: token });
  console.log('User:', user); // Log user data
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

// Server-side function to handle POST request
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;
    console.log("TOKEEEEN", token, "PASSSS", password)
    // Extract the token directly from req.query
    if (!token) {
      console.error('Token not found in the URL');
      console.log(token)
      // Handle the error, e.g., redirect to an error page or return an error response
      return NextResponse.json({ error: 'Token not found in the URL' });
    }

    // Fetch user data based on the token
    const user = await fetchData(token);
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

   
    // Send a success response
    return NextResponse.json({
      message: 'Password reset successful',
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Error in reset password API route:', error);
    // Handle the error, e.g., redirect to an error page
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
