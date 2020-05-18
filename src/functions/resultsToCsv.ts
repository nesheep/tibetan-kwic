import { Result } from "../interfaces";

const formatCsvString = (text: string) => {
  return text.replace(',', ' ').replace('"', ' ');
}

const resultsToCsv = (results: Result[]) => {
  let csvData = '';
  for (let i = 0; i < results.length; i++) {
    csvData += (i + 1).toString() + ',' +
      formatCsvString(results[i].text.left) + ',' +
      formatCsvString(results[i].text.match) + ',' +
      formatCsvString(results[i].text.right) + ',' +
      results[i].code + ',' +
      results[i].article.url + '\r\n'
  }
  return csvData;
}

export default resultsToCsv;
