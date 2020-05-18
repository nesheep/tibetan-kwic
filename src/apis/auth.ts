import axios from "axios";
import { API_URL } from "../constants";
import { LoginRes, LoginReq } from "../interfaces";

const login = async (
  name: string,
  password: string
): Promise<boolean> => {
  try {
    const params: LoginReq = { name, password }
    const response = await axios.post<LoginRes>(`${API_URL}auth/login`, null, { params });
    axios.defaults.headers.get.Authorization = `Bearer ${response.data.access_token}`;
    return true;
  } catch (error) {
    return false;
  }
}

export default login;
