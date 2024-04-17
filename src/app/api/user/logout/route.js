import getMessageData from "@/utils/getMessageData";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const response = NextResponse.json(getMessageData(null, "Logout successfully"), { status: 200 });
        response.cookies.set("data", "",
            {
                httpOnly: true,
                expires: new Date(0)
            });
        return response;
    } catch (error) {
        return NextResponse.json(getMessageData(null, error), { status: 400 });
    }
}