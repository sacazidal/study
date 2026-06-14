import { Injectable } from '@angular/core';
import { Genre, Artist, Album, Song } from './models';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly GENRES_KEY = 'mc_genres';
  private readonly ARTISTS_KEY = 'mc_artists';
  private readonly ALBUMS_KEY = 'mc_albums';
  private readonly SONGS_KEY = 'mc_songs';

  constructor() {
    this.initializeData();
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private initializeData() {
    if (!localStorage.getItem(this.GENRES_KEY)) {
      const defaultGenres: Genre[] = [
        { id: 'g1', name: 'Рок' },
        { id: 'g2', name: 'Поп' },
        { id: 'g3', name: 'Джаз' },
      ];
      localStorage.setItem(this.GENRES_KEY, JSON.stringify(defaultGenres));
    }
    if (!localStorage.getItem(this.ARTISTS_KEY)) {
      const defaultArtists: Artist[] = [
        { id: 'a1', name: 'Queen', genreId: 'g1' },
        { id: 'a2', name: 'Michael Jackson', genreId: 'g2' },
      ];
      localStorage.setItem(this.ARTISTS_KEY, JSON.stringify(defaultArtists));
    }
  }

  getGenres(): Genre[] {
    return JSON.parse(localStorage.getItem(this.GENRES_KEY) || '[]');
  }
  addGenre(name: string) {
    const genres = this.getGenres();
    genres.push({ id: this.generateId(), name });
    localStorage.setItem(this.GENRES_KEY, JSON.stringify(genres));
  }
  deleteGenre(id: string) {
    const genres = this.getGenres().filter((g) => g.id !== id);
    localStorage.setItem(this.GENRES_KEY, JSON.stringify(genres));
  }

  getArtists(): Artist[] {
    return JSON.parse(localStorage.getItem(this.ARTISTS_KEY) || '[]');
  }
  addArtist(name: string, genreId: string) {
    const artists = this.getArtists();
    artists.push({ id: this.generateId(), name, genreId });
    localStorage.setItem(this.ARTISTS_KEY, JSON.stringify(artists));
  }
  deleteArtist(id: string) {
    const artists = this.getArtists().filter((a) => a.id !== id);
    localStorage.setItem(this.ARTISTS_KEY, JSON.stringify(artists));
  }

  getAlbums(): Album[] {
    return JSON.parse(localStorage.getItem(this.ALBUMS_KEY) || '[]');
  }
  addAlbum(title: string, artistId: string, year: number) {
    const albums = this.getAlbums();
    albums.push({ id: this.generateId(), title, artistId, year });
    localStorage.setItem(this.ALBUMS_KEY, JSON.stringify(albums));
  }
  deleteAlbum(id: string) {
    const albums = this.getAlbums().filter((a) => a.id !== id);
    localStorage.setItem(this.ALBUMS_KEY, JSON.stringify(albums));
  }

  getSongs(): Song[] {
    return JSON.parse(localStorage.getItem(this.SONGS_KEY) || '[]');
  }
  addSong(title: string, albumId: string, duration: string) {
    const songs = this.getSongs();
    songs.push({ id: this.generateId(), title, albumId, duration });
    localStorage.setItem(this.SONGS_KEY, JSON.stringify(songs));
  }
  deleteSong(id: string) {
    const songs = this.getSongs().filter((s) => s.id !== id);
    localStorage.setItem(this.SONGS_KEY, JSON.stringify(songs));
  }

  getGenreName(genreId: string): string {
    return this.getGenres().find((g) => g.id === genreId)?.name || 'Неизвестно';
  }
  getArtistName(artistId: string): string {
    return this.getArtists().find((a) => a.id === artistId)?.name || 'Неизвестно';
  }
  getAlbumTitle(albumId: string): string {
    return this.getAlbums().find((a) => a.id === albumId)?.title || 'Неизвестно';
  }
}
