import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try{
    const reqBody= await request.json();
    const { email, password } = reqBody;

    // Check if user already exists
    const findUser= await User.findOne({email});
    if(!findUser){
        return NextResponse.json({error:"User does not exists"}, {status:400});
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, findUser.password);
    if(!validPassword){
        return NextResponse.json({error:"Invalid credentials"}, {status:400});
    }

    const tokenData = {
        id: findUser._id,
        email: findUser.email,
        username: findUser.username,
    }

    const token= jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {expiresIn: "1h"})

    const response= NextResponse.json({
        message: "Login successfull",
        success:true,
    })

    response.cookies.set("token", token, { httpOnly: true });

   return response;

  }
catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}