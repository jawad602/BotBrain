import Course from "@/Models/Course";
import { AddCourseValidation } from "@/utils/validation";
import { NextResponse } from "next/server";
import getMessageData from "@/utils/getMessageData";
import { connect } from "@/dbConnection/dbConnection";
connect();
export async function POST(request) {
    const reqBody = await request.json();
    const cookies = JSON.parse(request.cookies.get("data")?.value);
    console.log(cookies)
    const { error } = AddCourseValidation(reqBody);
    if (error) return NextResponse.json(getMessageData(null, error.details[0].message), { status: 400 });

    const courseExist = await Course.findOne({
        youtubeUrl: reqBody.youtubeUrl,
        userId: cookies.userId
    });
    if (courseExist) return NextResponse.json(getMessageData(courseExist, "Course is already exist"), { status: 400 });

    const course = new Course({
        title: reqBody.title,
        description: reqBody.description,
        youtubeUrl: reqBody.youtubeUrl,
        author: reqBody.author,
        userId: cookies.userId
    });

    try {
        const savedCourse = await course.save();
        return NextResponse.json(getMessageData(savedCourse, "Course is added successfully"), { status: 200 });
    } catch (error) {
        return NextResponse.json(getMessageData(null, error), { status: 400 });
    }


}