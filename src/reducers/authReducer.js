const authReducer = (state, { type, token }) => {
    switch (type) {
        case 'RESTORE_TOKEN':
            return {
                userToken: token,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                isSignout: false,
                userToken: token,
            };
        case 'SIGN_OUT':
            return {
                isSignout: true,
                userToken: null,
            };
    }
};


export { authReducer };