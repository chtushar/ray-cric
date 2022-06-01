import { Detail } from "@raycast/api";
import { useLiveScore } from "./hooks/useLiveScore";

const Command = () => {
  const { liveScoreMarkdown, isLoading } = useLiveScore();
  console.log(liveScoreMarkdown);

  return <Detail markdown={isLoading ? "Loading..." : liveScoreMarkdown} />;
};

export default Command;
