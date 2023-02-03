import { useEffect } from "react";

export default function RoomPage() {

    useEffect(() =>  {
        if (didLogRef.current === false) {
        const pass = window.location.state.pass;
        if (pass !== undefined) {
            return (
                <div>RoomPass: {pass}</div>
            );
        }
        didLogRef.current = true;
        }
    }, []
        )

    return (
        
        );
}