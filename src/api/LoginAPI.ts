const LoginAPI = {
  loginUser: (payload: { [key: string]: any }) => {
    return Promise.resolve({
      data: { session_id: "2er4r4r43r4-yhlkkkej" },
    });
  },
};

export default LoginAPI;
