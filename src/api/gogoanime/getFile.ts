import axios from "axios";
import { parse } from "node-html-parser";

const getFile = async(embeddedURL: string) => {
  const response = await axios.get(`https:${embeddedURL}`);
  const root = parse(response.data as string);
  const htmlElement = root.querySelector('.videocontent > script');
  const rawScript = htmlElement?.toString() || '';
  const files = rawScript.match(/(?<=sources:\[\{file: \'https:)(.*)(?=\',l)/);
  return files?.pop() || '';
};

export default getFile;
