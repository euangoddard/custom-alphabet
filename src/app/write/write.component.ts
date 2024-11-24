import { Component, computed, effect, inject, signal } from '@angular/core';
import { SymbolsService } from '../symbols.service';
import { letters } from '../constants';
import { NgFor } from '@angular/common';

@Component({
  selector: 'cus-write',
  imports: [NgFor],
  templateUrl: './write.component.html',
})
export class WriteComponent {
  private readonly symbols = inject(SymbolsService);
  private readonly value = signal('');

  readonly tokens = computed(() => {
    const value = this.value();
    return value.split('').map((char: string) => {
      if (letters.includes(char as any)) {
        return { char, uri: this.symbols.getLetterImageUri(char) };
      } else if (char === ' ') {
        return { char: '\u2007', uri: null };
      } else {
        return { char, uri: null };
      }
    });
  });

  readonly letterData = letters.map((letter: string) => ({
    letter,
    uri: this.symbols.getLetterImageUri(letter),
  }));

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}
