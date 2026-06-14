export default defineEventHandler(() => {
  return {
    message: 'Hello, World!',
    timestamp: new Date().toISOString(),
  };
})