import { connect } from "@/dbConnection/dbConnection";
import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getMessageData from "@/utils/getMessageData";
import { LoginValidation } from "@/utils/validation";

connect();
export async function POST(request) {
    const reqBody = await request.json();

    const { error } = LoginValidation(reqBody);
    if (error) return NextResponse.json(getMessageData(null, error.details[0].message), { status: 400 });
    // if(error) return res.status(400).send(getMessageData(null, error.details[0].message));

    const user = await User.findOne({ email: reqBody.email });
    if (!user) return NextResponse.json(getMessageData(null, "Email doesn't exist"), { status: 400 });

    const validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) return NextResponse.json(getMessageData(null, "Invalid password"), { status: 400 });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECERET, { expiresIn: '1d' });

    let data = {
        userId: user._id,
        name: user.name,
        token: token,
        email: user.email,
        status: user.status,
    }

    const response = NextResponse.json(getMessageData(data, 'Logged In'), { status: 200 });
    response.cookies.set("data", JSON.stringify(data),
        {
            httpOnly: true
        });
    await User.updateOne(
        { _id: user._id },
        {
            $set: {
                token: token,
            }
        }
    );

    // if(!user.status) return NextResponse.json(getMessageData(data, "Activate Email"), { status: 400 });


    try {
        return response;
        // res.header('auth-token', token).send(getMessageData(data, "Logged in"));
    } catch (error) {
        return NextResponse.json(getMessageData(null, error), { status: 400 });
        // res.status(400).send(getMessageData(null, error));
    }
}