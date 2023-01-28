import React from 'react';
import './App.css';
im
import { Authorized, Unauthorized } from './components/Authorized';
import { UserInfo } from './components/UserInfo';
import { SignOut } from './components/SignOut';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    return(
        <QueryClientProvider client={queryClient}>
            <Authorized  unauthorized={<Unauthorized />}>
                <UserInfo />
                <SignOut />
            </Authorized>
        </QueryClientProvider>
    );

}

export default App;