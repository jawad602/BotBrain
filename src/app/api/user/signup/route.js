import { connect } from "@/dbConnection/dbConnection";
import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getMessageData from "@/utils/getMessageData";
import { RegisterUserValidation } from "@/utils/validation";
import sendMail from "@/utils/mailer";
import { redirect } from "next/navigation";

connect();

export async function POST(request) {
    const reqBody = await request.json();
    const response = NextResponse.next()
    console.log(reqBody)
    const { error } = RegisterUserValidation(reqBody);
    if (error) return NextResponse.json(getMessageData(null, error.details[0].message), { status: 400 });

    const emailExist = await User.findOne({ email: reqBody.email });
    if (emailExist) return NextResponse.json(getMessageData(null, 'Email already exist, please try with new one'), { status: 400 });

    //  res.status(400).send(getMessageData(null, 'Email already exist, please try with new one'));

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqBody.password, salt);

    const user = new User({
        name: reqBody.name,
        email: reqBody.email,
        password: hashPassword,
    });

    try {
        const savedUser = await user.save();
        const { password, ...newUserData } = savedUser;

        const mailResponse = await sendMail(savedUser, "Activate Your Email");
        updateUserSecurityCode(savedUser, mailResponse.securityCode);
        redirect('/login');
        return NextResponse.json(getMessageData(savedUser, "Account created successfully"), { status: 303 });
        // res.status(200).send(getMessageData(newUserData, ));
    } catch (error) {
        return NextResponse.json(getMessageData(null, error), { status: 200 });
    }
}

async function updateUserSecurityCode(user, securityCode) {
    await User.updateOne(
        { _id: user._id },
        {
            $set: {
                securityCode: securityCode,
            }
        }
    );
}