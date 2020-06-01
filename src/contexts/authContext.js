import React, { useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import AsyncStorage from '@react-native-community/async-storage';


const ContextAuth = React.createContext();


const ContextAuthProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(authReducer,
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        });

    const signIn = async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    };
    const signOut = () => dispatch({ type: 'SIGN_OUT' });


    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        bootstrapAsync();
    }, []);


    return (
        <ContextAuth.Provider value={{ auth, signIn, signOut }}>
            {children}
        </ContextAuth.Provider>
    )
}

export { ContextAuth, ContextAuthProvider };