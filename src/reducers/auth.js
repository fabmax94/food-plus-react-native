const auth = (state, { type, token, avatar }) => {
  switch (type) {
    case "RESTORE_TOKEN":
      return {
        userToken: token,
        avatar: avatar,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        userToken: token,
        avatar: avatar,
      };
    case "SIGN_OUT":
      return {
        userToken: null,
        avatar: null,
      };
  }
};

export default auth;
