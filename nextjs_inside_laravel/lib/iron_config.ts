
export const ironOptions = {
    cookieName: "next_session_iron",
    password: "o?mxiy^wF0Jma3~3)ccFXXw!-,~%^VDbJ-cmPkydbwWZ3nU4chu",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };