// @unocss-include
import { useToasts } from '../lib/use-toasts';


type IToast = {
  icon?: string;
  text: string;
  classes?: string;
  duration?: number;
}

function launchToast(toast: IToast) {
  useToasts().value.push({
    key: makeUuid(),
    ...toast,
  });
}

export function toast(toast: IToast) {
  launchToast(toast);
}

export function toastSuccess(toast: IToast) {
  launchToast({
    icon: 'i-mdi-check',
    ...toast,
    classes: `success ${toast.classes || ''}`,
  });
}

export function toastError(toast: IToast) {
  launchToast({
    icon: 'i-mdi-alert',
    ...toast,
    classes: `danger ${toast.classes || ''}`,
  });
}

export function toastWarning(toast: IToast) {
  launchToast({
    icon: 'i-mdi-bell',
    duration: 1000000,
    ...toast,
    classes: `warning ${toast.classes || ''}`,
  });
}

