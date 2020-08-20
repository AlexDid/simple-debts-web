import { DebtTypeForm } from './debt-type.form';
import { VirtualUserForm } from './virtual-user.form';
import { SelectUserForm } from './select-user.form';
import { CurrencyForm } from './currency.form';

export type AddDebtNestedForm = DebtTypeForm | VirtualUserForm | SelectUserForm | CurrencyForm;
