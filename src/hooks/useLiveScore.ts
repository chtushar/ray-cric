import { useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";

const LIVE_SCORES = "http://static.espncricinfo.com/rss/livescores.xml";

const getSanitizedData = (data: any) => {
  return data.rss.channel[0].item.map((item: any) => {
    return {
      title: item.title[0],
      link: item.link[0],
    };
  });
};

const createMarkdownFromSanitizedData = (data: any) => {
  const arr = data.map((item: any) => {
    return `
      [${item.title}](${item.link})
    `;
  });

  return arr.join("\n");
};

export const useLiveScore = () => {
  // const [lastPublished, setLastPublished] = useState<string>("");
  const [liveScores, setLiveScores] = useState([]);
  const [liveScoreMarkdown, setLiveScoreMarkdown] = useState("");
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
          const liveScoreMarkdown = createMarkdownFromSanitizedData(liveScores);

          setLiveScores(liveScores);
          setLiveScoreMarkdown(liveScoreMarkdown);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchLiveScores();
  }, []);

  return { liveScores, liveScoreMarkdown, isLoading };
};
