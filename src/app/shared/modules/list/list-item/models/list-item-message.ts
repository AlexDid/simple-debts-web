import { ListItemMessageColor } from './list-item-message-color.enum';
import { Action } from '@ngrx/store';

export interface ListItemMessage {
  color: ListItemMessageColor;
  text: string;
  action?: Action;
}
