

export async function launchButtonPickerDialog({ icon, title, description, text, classes, startButtons, endButtons, options }) {
  return launchDialog({
    component: defineAsyncComponent({ loader: () => import('../button-picker/dialog.vue') }),
    props: {
      icon,
      title,
      description,
      text,
      classes,
      startButtons,
      endButtons,
    },
    options,
  });
}
