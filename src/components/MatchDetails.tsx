import type { LiveScore } from "../hooks/useLiveScore";
import { Detail } from "@raycast/api";
import { useMatchDetails } from "../hooks/useMatchDetails";

const MatchDetails = ({ item }: { item: LiveScore }) => {
  useMatchDetails({ matchLink: item.link });
  return <Detail markdown={`# ${item.title}`} />;
};

const Command = ({ item }: { item: LiveScore }) => {
  return <MatchDetails item={item} />;
};

export default Command;
