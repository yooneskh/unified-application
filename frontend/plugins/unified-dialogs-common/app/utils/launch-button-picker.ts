

interface IOptions {
  icon?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  classes?: string;
  startButtons: { value: string; label?: string; icon?: string; classes?: string; handler?: () => void; }[];
  endButtons: { value: string; label?: string; icon?: string; classes?: string; handler?: () => void; }[];
  options: any;
  onResolve?: (value: any) => void;
  onReject?: (reason: any) => void;
}

export async function launchButtonPickerDialog(options: IOptions) {
  return launchDialog({
    component: defineAsyncComponent({ loader: () => import('../button-picker/dialog.vue') }),
    props: {
      icon: options.icon,
      title: options.title,
      subtitle: options.subtitle,
      text: options.text,
      classes: options.classes,
      startButtons: options.startButtons,
      endButtons: options.endButtons,
    },
    options: options.options,
    onResolve: options.onResolve,
    onReject: options.onReject,
  });
}
