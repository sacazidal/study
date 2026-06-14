import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MusicService } from './music';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  private fb = inject(FormBuilder);
  private musicService = inject(MusicService);

  activeTab: 'genres' | 'artists' | 'albums' | 'songs' = 'genres';

  get genres() {
    return this.musicService.getGenres();
  }
  get artists() {
    return this.musicService.getArtists();
  }
  get albums() {
    return this.musicService.getAlbums();
  }
  get songs() {
    return this.musicService.getSongs();
  }

  genreForm: FormGroup = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  artistForm: FormGroup = this.fb.nonNullable.group({
    name: ['', Validators.required],
    genreId: ['', Validators.required],
  });

  albumForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    artistId: ['', Validators.required],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
  });

  songForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    albumId: ['', Validators.required],
    duration: ['', [Validators.required, Validators.pattern(/^\d+:\d{2}$/)]],
  });

  addGenre() {
    if (this.genreForm.valid) {
      this.musicService.addGenre(this.genreForm.getRawValue().name);
      this.genreForm.reset();
    }
  }

  addArtist() {
    if (this.artistForm.valid) {
      const { name, genreId } = this.artistForm.getRawValue();
      this.musicService.addArtist(name, genreId);
      this.artistForm.reset();
    }
  }

  addAlbum() {
    if (this.albumForm.valid) {
      const { title, artistId, year } = this.albumForm.getRawValue();
      this.musicService.addAlbum(title, artistId, year);
      this.albumForm.reset({ year: new Date().getFullYear() });
    }
  }

  addSong() {
    if (this.songForm.valid) {
      const { title, albumId, duration } = this.songForm.getRawValue();
      this.musicService.addSong(title, albumId, duration);
      this.songForm.reset();
    }
  }

  deleteGenre(id: string) {
    this.musicService.deleteGenre(id);
  }
  deleteArtist(id: string) {
    this.musicService.deleteArtist(id);
  }
  deleteAlbum(id: string) {
    this.musicService.deleteAlbum(id);
  }
  deleteSong(id: string) {
    this.musicService.deleteSong(id);
  }
  getGenreName(id: string) {
    return this.musicService.getGenreName(id);
  }
  getArtistName(id: string) {
    return this.musicService.getArtistName(id);
  }
  getAlbumTitle(id: string) {
    return this.musicService.getAlbumTitle(id);
  }
}
