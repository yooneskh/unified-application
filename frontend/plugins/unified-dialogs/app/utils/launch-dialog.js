import { useDialogs } from '../states/dialogs';


export function launchDialog({ component, props, options, onResolve, onReject }) {
  
  const dialogs = useDialogs();

  return new Promise((resolve, reject) => {

    const dialog = reactive({
      key: makeUuid(),
      component: markRaw(component),
      modelValue: false,
      props: props ?? {},
      options: options ?? {},
      onResolve: onResolve,
      onReject: onReject,
      resolve,
      reject,
    });

    dialogs.value.push(dialog);

    setTimeout(() => {
      dialog.modelValue = true;
    }, 5);

  });

}
