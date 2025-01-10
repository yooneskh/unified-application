

interface IOptions {
  icon?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  classes?: string;
  fields?: any[];
  submitLabel?: string;
  cancelLabel?: string;
  handler?: (form: any) => void;
  options?: any;
  onResolve?: (value: any) => void;
  onReject?: (reason: any) => void;
}

export async function launchFormPickerDialog(options: IOptions) {
  return launchDialog({
    component: defineAsyncComponent({ loader: () => import('../form-picker/dialog.vue') }),
    props: {
      icon: options.icon,
      title: options.title,
      subtitle: options.subtitle,
      text: options.text,
      classes: options.classes,
      fields: options.fields,
      submitLabel: options.submitLabel,
      cancelLabel: options.cancelLabel,
      handler: options.handler,
    },
    options: options.options,
    onResolve: options.onResolve,
    onReject: options.onReject,
  });
}
