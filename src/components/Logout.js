"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Logout() {
    const router = useRouter();
    const logout =async  () => {
        localStorage.clear();
        try {
            let response = await fetch('/api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {}
            });
            router.push('/login');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Button onClick={logout} variant="contained">Logout</Button>
        </div>
    )
}