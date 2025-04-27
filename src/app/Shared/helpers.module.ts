import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { FontSizeDirective } from './directives/font-size.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
    MultiplyDirective,
    FontSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[FullNamePipe,HighlightDirective, MultiplyDirective,FontSizeDirective]
})
export class HelpersModule { }
