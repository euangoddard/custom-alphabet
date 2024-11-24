import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CharEditComponent } from '../char-edit/char-edit.component';
import { SymbolsService } from '../symbols.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cus-capture-detail',
  imports: [CharEditComponent, RouterLink],
  templateUrl: './capture-detail.component.html',
})
export class CaptureDetailComponent implements OnChanges {
  private readonly symbols = inject(SymbolsService);
  private readonly router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['letter']) {
      this.uri = this.symbols.getLetterImageUri(changes['letter'].currentValue);
    }
  }
  readonly letter = input.required<string>();

  uri: string | null = null;

  saveImage(uri: string): void {
    this.symbols.setLetterImageUri(this.letter(), uri);
    this.router.navigate(['/capture']);
  }
}
