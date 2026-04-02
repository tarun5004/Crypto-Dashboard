export const validationRules = {
  required: (label) => ({
    required: `${label} is required.`,
  }),
  email: {
    required: 'Email is required.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address.',
    },
  },
  amount: (label = 'Amount', minimum = 1) => ({
    required: `${label} is required.`,
    min: {
      value: minimum,
      message: `${label} must be at least ${minimum}.`,
    },
  }),
  password: {
    required: 'Password is required.',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters.',
    },
  },
}
