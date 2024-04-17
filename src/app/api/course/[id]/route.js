import { connect } from "@/dbConnection/dbConnection";
import Course from "@/Models/Course";
connect()
export async function DELETE(request) {
    const { id } = request.query;

    const course = Course.findOne({ _id: id });
    if (!course) return NextResponse.json(getMessageData(null, "Course does not exist"), { status: 400 });

    try {
        await Course.deleteOne({ _id: id });
        return NextResponse.json(getMessageData(null, "Course is deleted"), { status: 200 });
    } catch (error) {
        return NextResponse.json(getMessageData(null, error), { status: 400 });
    }
}