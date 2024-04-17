import Course from "@/Models/Course";
import { NextRequest, NextResponse } from "next/server";
import getMessageData from "@/utils/getMessageData";
import { connect } from "@/dbConnection/dbConnection";
connect();
export async function POST(request) {
     try {
        const req = NextResponse.next()
        // Parse JSON from the request body
        const reqBody = await request.json();
        console.log(req.cookies.get("data").value);
        // Attempt to parse the 'data' cookie safely
        const cookieData = request.cookies.get("data");
        let userData = cookieData ? JSON.parse(cookieData.value || '{}') : {};

        // Log for debugging - consider removing in production
        console.log("Cookies:", userData, "Request Body:", reqBody);

        // Validate required user information
        if (!userData.userId) {
            return NextResponse.json(getMessageData(null, "User ID is missing"), {status: 400});
        }

        // Query the database for courses
        const courses = await Course.find({ userId: userData.userId });
        
        // Return the list of courses
        return NextResponse.json(getMessageData(courses, "All Courses loaded"), {status: 200});

     } catch (error) {
        return NextResponse.json(getMessageData(null, error), {status: 400});
     }
}