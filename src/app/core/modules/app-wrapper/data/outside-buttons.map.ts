import { AppWrapperConfig } from '../../router';
import { OutsideButton } from '../models';
import { Icons } from '../../../models';

export const outsideButtonsMap = new Map<keyof AppWrapperConfig, OutsideButton>([
  ['logout', { title: 'logout', icon: Icons.LOGOUT }],
  ['addDebt', { title: 'add debt', icon: Icons.PLUS }],
  ['deleteDebt', { title: 'delete debt', icon: Icons.CROSS }],
]);
