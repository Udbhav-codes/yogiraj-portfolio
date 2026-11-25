-- Film episodes: ordered list of { title, video_url } shown as episode cards
-- under the player on the public site. The Studio saves this column when a
-- film has episodes; without it every film save that includes episodes fails.
alter table films
  add column if not exists episodes jsonb not null default '[]'::jsonb;
