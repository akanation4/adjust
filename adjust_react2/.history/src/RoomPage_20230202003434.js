
export default function RoomPage() {

    const search = window.location.search;
    const params = new URLSearchParams(search);

    return (
        <div>
            <S
            <h1>{params}</h1>
        </div>
    );
}