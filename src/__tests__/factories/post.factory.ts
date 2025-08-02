export function postFactory(override: any) {
  return {
    title: 'new post',
    content: 'post content',
    ...override,
  }
}
