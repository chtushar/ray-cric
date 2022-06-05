import React from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import { LiveScoreItem } from "../interfaces/response";

const getFormattedMatchDetails = (htmlString: string) => {
  const $ = cheerio.load(htmlString);

  const title = $("title").text();
  const playersAndOvers = title.slice(title.indexOf("(") + 1, title.indexOf(")")).split(", ");

  const overs = playersAndOvers[0];
  const batters = [playersAndOvers[1], playersAndOvers[2]];
  const bowler = playersAndOvers[3];

  return {
    overs,
    batters,
    bowler,
  };
};

export const useMatchDetails = ({ matchLink }: { matchLink: LiveScoreItem["guid"][number] }) => {
  const fetchMatchDetails = async (matchLink: string) => {
    const htmlData = await axios.get(matchLink);
    const formattedData = getFormattedMatchDetails(htmlData.data);

    console.log(formattedData);
  };

  React.useEffect(() => {
    fetchMatchDetails(matchLink);
  }, [matchLink]);

  return {};
};
