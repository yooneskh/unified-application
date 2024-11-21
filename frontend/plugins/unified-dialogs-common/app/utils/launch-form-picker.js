

export async function launchFormPickerDialog({ icon, title, description, text, classes, fields, submitLabel, cancelLabel, handler, options }) {
  return launchDialog({
    component: defineAsyncComponent({ loader: () => import('../form-picker/dialog.vue') }),
    props: {
      text,
      classes,
      fields,
      submitLabel,
      cancelLabel,
      handler,
    },
    options: {
      icon,
      title,
      description,
      ...(options || {}),
    },
  });
}
