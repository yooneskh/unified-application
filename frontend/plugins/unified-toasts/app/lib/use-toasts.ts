

export const useToasts = () => (
  useState<any[]>('--u-toasts--', () => [])
);
