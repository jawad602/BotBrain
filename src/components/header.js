import { Button } from "@mui/material";
import Link from "next/link";
import Logout from "./Logout";
export default function Header() {
    
    return (
        <>
            <div className="flex justify-between items-center px-5 h-20">
                <div className="flex gap-2">
                    <Button variant="contained"><Link href='add'>Add Course</Link></Button>
                    <Button variant="contained"><Link href='all'>All Course</Link></Button>
                </div>

                <Logout />
            </div>
        </>
    )
}