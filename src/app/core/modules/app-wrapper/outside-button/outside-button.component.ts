import { Component, Input } from '@angular/core';
import { OutsideButton } from '../models';

@Component({
  selector: 'app-outside-button',
  templateUrl: './outside-button.component.html',
  styleUrls: ['./outside-button.component.scss']
})
export class OutsideButtonComponent {

  @Input()
  button: OutsideButton;

  @Input()
  selected = false;

}
