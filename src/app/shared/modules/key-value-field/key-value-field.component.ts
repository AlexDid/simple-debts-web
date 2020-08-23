import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-value-field',
  templateUrl: './key-value-field.component.html',
  styleUrls: ['./key-value-field.component.scss']
})
export class KeyValueFieldComponent {

  @Input()
  key: string;

  @Input()
  value: string;

}
