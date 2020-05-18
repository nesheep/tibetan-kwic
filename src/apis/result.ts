import axios from "axios";
import { API_URL } from "../constants";
import { Results } from "../interfaces";

export const getResults = async (
  keyword: string,
  length: number,
  limit: number,
  shuffle: string
): Promise<Results | void> => {
  const fullWidthKeyword = keyword.replace('?', '？');
  const params = {
    length: String(length),
    limit: String(limit),
    shuffle
  }
  try {
    const response = await axios.get<Results>(`${API_URL}texts/kwic/${fullWidthKeyword}`, { params });
    const results = response.data;
    return results
  } catch (error) {
    return
  }
}
