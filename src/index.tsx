import { Action, ActionPanel, List } from "@raycast/api";
import MatchDetails from "./components/MatchDetails";
import { useLiveScore } from "./hooks/useLiveScore";

const Command = () => {
  const { liveScores, isLoading } = useLiveScore();

  return (
    <List isLoading={isLoading}>
      {liveScores?.map((liveScore) => {
        return (
          <List.Item
            key={liveScore.title}
            title={liveScore.title}
            actions={
              <ActionPanel>
                <Action.Push title={liveScore.title} target={<MatchDetails item={liveScore} />} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
};

export default Command;
