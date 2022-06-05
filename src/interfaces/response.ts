export interface LiveScoreItem {
  title: Array<string>;
  guid: Array<string>;
}

interface Channel {
  item: Array<LiveScoreItem>;
}

interface RSS {
  channel: Array<Channel>;
}

export interface LiveScoresAPIResponse {
  rss: RSS;
}
