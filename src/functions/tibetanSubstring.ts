import { TSHEG_OR_SHAD } from "../constants";

const tibetanSubstring = (
  text: string,
  start?: number,
  end?: number
) => {
  if (!text) {
    return text;
  }
  let subText = text;
  if (end && end < text.length) {
    const match = subText.substring(0, end).match(new RegExp(`.+[${TSHEG_OR_SHAD}]+`));
    if (match) {
      subText = match[0];
    }
  }
  if (start && 0 < start) {
    const match = subText.substring(start).match(new RegExp(`[${TSHEG_OR_SHAD}]+.+`));
    if (match) {
      subText = match[0].substring(1);
    }
  }
  return subText;
}

export default tibetanSubstring;
