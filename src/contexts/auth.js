import React, { useReducer, useEffect, useState } from "react";
import authReducer  from "../reducers/auth";
import AsyncStorage from "@react-native-community/async-storage";
import { FirebaseService } from "../services/firebase-service";

const ContextAuth = React.createContext();

const ContextAuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    isLoading: true,
    userToken: null,
  });
  const [isLoadingSignIn, setIsLoadingSigIn] = useState(false);

  const signIn = async data => {
    setIsLoadingSigIn(true);
    if (data.avatar) {
      data.avatar = await FirebaseService.pushFile(data.avatar);
    }
    await AsyncStorage.setItem("userToken", data.name);
    await AsyncStorage.setItem("userAvatar", data.avatar);
    dispatch({ type: "SIGN_IN", token: data.name, avatar: data.avatar });
    setIsLoadingSigIn(false);
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    dispatch({ type: "SIGN_OUT" });
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let avatar;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
      }
      try {
        avatar = await AsyncStorage.getItem("userAvatar");
      } catch (e) {
      }
      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        avatar: avatar,
        isLoading: false,
      });
    };

    bootstrapAsync();
  }, []);

  return (
    <ContextAuth.Provider value={{ auth, signIn, signOut, isLoadingSignIn }}>
      {children}
    </ContextAuth.Provider>
  );
};

export { ContextAuth, ContextAuthProvider };
