"use server";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'title', headerName: 'Title', width: 70 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'youtubeYrl', headerName: 'Youtube URL', width: 130 },
    { field: 'author', headerName: 'Author', width: 130 },
];

export default async function All() {
    const response = await fetch('/api/course/all', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: "jawad" }),
    });

    const data = await response.json();
    console.log("🚀 ~ All ~ data:", data);

    const rows = [];
    return (
        <div className='px-5' style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </div>
    );
}