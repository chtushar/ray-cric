import axios from "axios";
import xml2js from "xml2js";
import { LiveScoresAPIResponse, LiveScoreItem } from "../interfaces/response";
import useSWR from "swr";

const LIVE_SCORES = "http://static.espncricinfo.com/rss/livescores.xml";

export interface LiveScore {
  title: string;
  link: string;
}

const getSanitizedData = (data: LiveScoresAPIResponse) => {
  return data.rss.channel[0].item.map((item: LiveScoreItem) => {
    return {
      title: item.title[0],
      link: item.guid[0],
    };
  });
};

const fetchLiveScores = (url: string) => {
  return axios
    .get(url)
    .then((res) => {
      const data = res.data;
      return data;
    })
    .then((data) => {
      const parser = new xml2js.Parser();
      let liveScores: Array<LiveScore> = [];
      parser.parseString(data, (err, result) => {
        liveScores = getSanitizedData(result);
      });
      return liveScores;
    });
};

export const useLiveScore = () => {
  const { data, error } = useSWR(LIVE_SCORES, fetchLiveScores);

  return { liveScores: data, isLoading: !error && !data };
};
