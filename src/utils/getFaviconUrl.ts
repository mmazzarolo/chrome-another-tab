export const getFaviconUrl = (url: string) => {
  try {
    const prefixLessUrl = new URL(url || "").hostname;
    return `https://api.faviconkit.com/${prefixLessUrl}/32`;
  } catch (err) {
    return "";
  }
};
