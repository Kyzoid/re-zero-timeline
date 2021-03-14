export type EventType = {
  timeline: string;
  type: string;
  episode: string;
  episodeRelativeTC: string;
  timecode: string;
  absoluteTC: string;
  description: string;
  position?: string;
  id?: string;
  image?: string;
}

export type RespawnPointType = {
  timeline: string;
  type: string;
  episode: string;
  episodeRelativeTC: string;
  timecode: string;
  absoluteTC: string;
  description: string;
  position?: string;
  id: string;
  image?: string;
}

export type TimelineType = {
  id: number;
  startAt: string;
  respawnId: number;
  complexity: number;
  direction: string;
  endAt: string;
  duration?: number;
  width?: string;
  events: (EventType | RespawnPointType)[];
}

export type EpisodeType = {
  id: number;
  code: string;
  endAt: string;
  title: string;
  length: string;
  width?: number;
}