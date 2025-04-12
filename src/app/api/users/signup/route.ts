import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  try{
    const reqBody= await request.json();
    const { username, email, password } = reqBody;

    // Check if user already exists
    const findUser= await User.findOne({email});
    if(findUser){
        return NextResponse.json({error:"User already exists"}, {status:400});
    }

    // Hash password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);

    // Create new user
    const newUser= await User.create({
        username,
        email,
        password: hashedPassword,
    });

   const savedUser= await newUser.save();

   return NextResponse.json({message:"User created successfully"}, {status:201});

  }
catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


