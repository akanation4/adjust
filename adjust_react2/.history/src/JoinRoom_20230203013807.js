

export default function JoinRoom() {
    const pass = useContext(RoomContext);

    return (
        <div>RoomPass: {pass}</div>
    );
}