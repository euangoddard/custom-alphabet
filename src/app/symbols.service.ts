import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SymbolsService {
  private readonly storage: Storage;

  constructor() {
    if (typeof globalThis.localStorage === 'undefined') {
      this.storage = {
        getItem: () => null,
        setItem: () => {},
        clear: () => {},
        removeItem: () => {},
        key: () => null,
        length: 0,
      };
    } else {
      this.storage = globalThis.localStorage;
    }
  }

  getLetterImageUri(letter: string): string | null {
    return this.storage.getItem(this.getLetterStorageKey(letter)) ?? null;
  }

  setLetterImageUri(letter: string, uri: string): void {
    this.storage.setItem(this.getLetterStorageKey(letter), uri);
  }

  private getLetterStorageKey(letter: string): string {
    return `letter:${letter}`;
  }
}
