// @flow
export type Rating = {
  userId: number,
  value: number,
}

export type Comment = {
  userId: number,
  content: string,
}

export type Actor = {
  actorId: number,
}

export type Director = {
  directorId: number,
}

export type Writer = {
  writerId: number,
}

export type Movie = {
  title: string,
  // Generic
  year: number,
  countries: string[],
  // Meta
  plot: string,
  genres: string[],
  // Technical
  runtime: number,
  awards: string[],
  // Cast
  directors: Director[],
  actors: Actor[],
  writers: Writer[],
  // Media
  posters: string[],
  images: string[],
  videos: string[],
  // Community
  ratings: Rating[],
  comments: Comment[],
}

