import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try{
       const userID = await getDataFromToken(request);
       console.log(userID);
       const user = await User.findOne({ _id : userID});
       return NextResponse.json({
           message: "User fetched successfully",
           data : user
    });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
