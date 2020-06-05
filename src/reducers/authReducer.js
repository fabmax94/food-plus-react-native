const authReducer = (state, {type, token, avatar}) => {
  switch (type) {
    case 'RESTORE_TOKEN':
      return {
        userToken: token,
        avatar: avatar,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        isSignout: false,
        userToken: token,
        avatar: avatar,
      };
    case 'SIGN_OUT':
      return {
        isSignout: true,
        userToken: null,
        avatar: null,
      };
  }
};

export {authReducer};
