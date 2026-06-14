export interface Genre {
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
  genreId: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  year: number;
}

export interface Song {
  id: string;
  title: string;
  albumId: string;
  duration: string;
}
