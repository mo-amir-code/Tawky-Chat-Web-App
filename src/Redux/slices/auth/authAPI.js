import { httpAxios } from "../../../services/axios";

export function login(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.post("/auth/login", data);
      // console.log(response.data)
      resolve(response.data);
    } catch (err) {
      reject(err.response.data);
    }
  });
}

export function register(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.post("/auth/register", data);
      console.log(response)
      resolve(response.data);
    } catch (err) {
      console.log(err);
      reject(err.response.data);
    }
  });
}

export function forgotPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.post("/auth/forgot-password", data);
      resolve(response.data);
    } catch (err) {
      console.log(err);
      reject(err.response.data);
    }
  });
}

export function newPassword({data, token}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.post(`/auth/reset-password?token=${token}`, data);
      resolve(response.data);
    } catch (err) {
      console.log(err);
      reject(err.response.data);
    }
  });
}

export function verifyOTP(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.post("/auth/verify", data);
      resolve(response.data);
    } catch (err) {
      reject(err.response.data);
    }
  });
}
