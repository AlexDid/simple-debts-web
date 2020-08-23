import { Component, Input } from '@angular/core';
import { Debt } from '../../../store/debts/models';

@Component({
  selector: 'app-creation-screen',
  templateUrl: './creation-screen.component.html',
  styleUrls: ['./creation-screen.component.scss']
})
export class CreationScreenComponent {

  @Input()
  debt: Debt;

}
