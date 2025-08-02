export const commentFactory = (override?: any) => {
  return {
    content: 'comment content',
    ...override,
  }
}
