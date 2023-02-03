
export default function RoomPage() {

    const search = window.location.search;
    const params = new URLSearchParams(search);

    return (
        <div>
            <h1>{params}</h1>
        </div>
    );
}