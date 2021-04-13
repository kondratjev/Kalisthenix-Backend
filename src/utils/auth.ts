import jwt from "jsonwebtoken";

import CONFIG from "../config";

export const getTokens = ({ username, email, name, _id }) => {
  const token = jwt.sign({ _id }, CONFIG.JWT_TOKEN_SECRET, {
    expiresIn: "1d"
  });
  const refreshToken = jwt.sign({ _id }, CONFIG.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "2d"
  });
  return {
    token,
    refreshToken
  };
};

export const getContext = request => {
  try {
    const header = request.req.headers.authorization;

    if (!header) return { isAuth: false };

    const token = header.split(" ");

    if (!token) return { isAuth: false };

    type DecodedToken = { _id: string };
    const decodedToken = jwt.verify(
      token[1],
      CONFIG.JWT_TOKEN_SECRET
    ) as DecodedToken;

    if (!decodedToken) return { isAuth: false };

    return { isAuth: true, userId: decodedToken._id };
  } catch (err) {
    return { isAuth: false };
  }
};
