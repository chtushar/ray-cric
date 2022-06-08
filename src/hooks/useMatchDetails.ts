import axios from "axios";
import * as cheerio from "cheerio";
import type { LiveScore } from "./useLiveScore";
import useSWR from "swr";

export interface FormattedScoreData {
  overs: string;
  batters: string[];
  bowler: string;
}

const getFormattedMatchDetails = (htmlString: string): FormattedScoreData => {
  const $ = cheerio.load(htmlString);

  const htmlTitleContent = $("title").text();
  const playersAndOvers = htmlTitleContent
    .slice(htmlTitleContent.indexOf("(") + 1, htmlTitleContent.indexOf(")"))
    .split(", ");

  const overs = playersAndOvers[0];
  const batters = [playersAndOvers[1], playersAndOvers[2]];
  const bowler = playersAndOvers[3];

  return {
    overs,
    batters,
    bowler,
  };
};

const fetchMatchDetails = (link: LiveScore["link"]) => {
  return axios
    .get(link)
    .then((res) => res.data)
    .then((data) => {
      const formattedData = getFormattedMatchDetails(data);
      return formattedData;
    });
};

export const useMatchDetails = (item: LiveScore) => {
  const { data, error } = useSWR(item.link, fetchMatchDetails);

  return {
    isLoading: !error && !data,
    data: {
      ...data,
      title: item.title,
    },
  };
};
