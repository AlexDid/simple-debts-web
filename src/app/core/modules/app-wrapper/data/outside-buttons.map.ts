import { AppWrapperConfig } from '../../router';
import { OutsideButton } from '../models';
import { Icons } from '../../../models';

export const outsideButtonsMap = new Map<keyof AppWrapperConfig, OutsideButton>([
  ['logout', { title: 'logout', icon: Icons.LOGOUT }],
  ['addDebt', { title: 'add debt', icon: Icons.PLUS }],
  ['addOperation', { title: 'add operation', icon: Icons.PLUS }],
  ['deleteDebt', { title: 'delete debt', icon: Icons.CROSS }],
  ['showAllOperations', { title: 'only accepted operations', icon: Icons.EYE }],
  ['deleteOperation', { title: 'delete operation', icon: Icons.CROSS }],
  ['acceptOperation', { title: 'accept operation', icon: Icons.ACCEPT }],
  ['declineOperation', { title: 'decline operation', icon: Icons.DECLINE }],
  ['acceptDebt', { title: 'accept debt', icon: Icons.ACCEPT }],
  ['declineDebt', { title: 'decline debt', icon: Icons.DECLINE }],
]);
