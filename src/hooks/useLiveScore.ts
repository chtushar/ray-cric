import { useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";
import { LiveScoresAPIResponse, LiveScoreItem } from "../interfaces/response";

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

export const useLiveScore = () => {
  const [liveScores, setLiveScores] = useState<Array<LiveScore>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLiveScores = async () => {
    axios
      .get(LIVE_SCORES)
      .then((res) => {
        const data = res.data;
        return data;
      })
      .then((data) => {
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
          const liveScores = getSanitizedData(result);
          setLiveScores(liveScores);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchLiveScores();
  }, []);

  return { liveScores, isLoading };
};
