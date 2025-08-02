export const userFactory = (override: any = {}) => ({
  name: 'admin',
  email: 'user@example.com',
  password: 'password123',
  ...override,
})
