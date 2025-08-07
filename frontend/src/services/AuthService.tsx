// src/services/authService.ts

import axios from "axios";

import type { UserProfileToken } from "../models/User";
import { Status, type IResponse } from "../interfaces/IResponse";
import { handleError } from "../helpers/HandleError";

const URL: string = "/api/auth";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<IResponse>(`${URL}/login`, {
      userName: username,
      password,
    });
    if (data.data.status === Status.ERROR) {
      throw new Error(JSON.stringify(data.data));
    }
    const userProfile = data.data.result;
    return userProfile;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(`${URL}/register`, {
      email,
      username,
      password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
