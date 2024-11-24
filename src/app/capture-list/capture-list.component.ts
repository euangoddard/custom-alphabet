import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SymbolsService } from '../symbols.service';
import { letters } from '../constants';

@Component({
  selector: 'cus-capture-list',
  imports: [NgFor, RouterLink],
  templateUrl: './capture-list.component.html',
})
export class CaptureListComponent {
  private readonly symbols = inject(SymbolsService);

  readonly letterData = letters.map((letter: string) => ({
    letter,
    uri: this.symbols.getLetterImageUri(letter),
  }));
}
