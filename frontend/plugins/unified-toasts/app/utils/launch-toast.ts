

function launchToast(toast: Partial<import("@nuxt/ui/runtime/composables/useToast.js").Toast>) {
  useToast().add(toast);
}

export function toast(toast: Partial<import("@nuxt/ui/runtime/composables/useToast.js").Toast>) {
  launchToast(toast);
}

export function toastSuccess(toast: Partial<import("@nuxt/ui/runtime/composables/useToast.js").Toast>) {
  launchToast({
    color: 'success',
    icon: 'i-mdi-check',
    ...toast,
  });
}

export function toastError(toast: Partial<import("@nuxt/ui/runtime/composables/useToast.js").Toast>) {
  launchToast({
    color: 'error',
    icon: 'i-mdi-alert',
    ...toast,
  });
}

export function toastWarning(toast: Partial<import("@nuxt/ui/runtime/composables/useToast.js").Toast>) {
  launchToast({
    color: 'warning',
    icon: 'i-mdi-bell',
    ...toast,
  });
}

