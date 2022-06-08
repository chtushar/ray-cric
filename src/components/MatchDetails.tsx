import type { LiveScore } from "../hooks/useLiveScore";
import { Detail } from "@raycast/api";
import { useMatchDetails } from "../hooks/useMatchDetails";

const MatchDetails = ({ item }: { item: LiveScore }) => {
  const { data, isLoading } = useMatchDetails(item);
  return (
    <Detail
      isLoading={isLoading}
      markdown={
        isLoading
          ? ""
          : `
  ## ${data?.title}

  **Batters**: ${data?.batters?.join(", ")}

  **Bowlers**: ${data?.bowler}, *${data?.overs}*


  `
      }
    />
  );
};

const Command = ({ item }: { item: LiveScore }) => {
  return <MatchDetails item={item} />;
};

export default Command;
