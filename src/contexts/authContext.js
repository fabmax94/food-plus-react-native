import React, {useReducer, useEffect} from 'react';
import {authReducer} from '../reducers/authReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {FirebaseService, PathRecipe} from '../services/FirebaseService';

const ContextAuth = React.createContext();

const ContextAuthProvider = ({children}) => {
  const [auth, dispatch] = useReducer(authReducer, {
    isLoading: true,
    userToken: null,
  });

  const signIn = async data => {
    if (data.avatar) {
      FirebaseService.pushFile(data.avatar, url => {
        data.avatar = url;
        AsyncStorage.setItem('userAvatar', data.avatar);
        dispatch({type: 'SIGN_IN', token: data.name, avatar: data.avatar});
      });
    }
    await AsyncStorage.setItem('userToken', data.name);
    dispatch({type: 'SIGN_IN', token: data.name, avatar: null});
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    dispatch({type: 'SIGN_OUT'});
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let avatar;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {}
      try {
        avatar = await AsyncStorage.getItem('userAvatar');
      } catch (e) {}
      dispatch({type: 'RESTORE_TOKEN', token: userToken, avatar: avatar});
    };

    bootstrapAsync();
  }, []);

  return (
    <ContextAuth.Provider value={{auth, signIn, signOut}}>
      {children}
    </ContextAuth.Provider>
  );
};

export {ContextAuth, ContextAuthProvider};
