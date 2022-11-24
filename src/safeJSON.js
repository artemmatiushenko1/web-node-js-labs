export const safeJSON = (content, fallback) => {
  try {
    return JSON.parse(content);
  } catch {
    return fallback;
  }
};
