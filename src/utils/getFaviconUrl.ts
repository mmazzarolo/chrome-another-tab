export const getFaviconUrl = (url: string) => {
  try {
    if (process.env.NODE_ENV === "development") {
      const prefixLessUrl = new URL(url || "").hostname;
      return `https://api.faviconkit.com/${prefixLessUrl}/32`;
    } else {
      return `chrome://favicon/size/16@2x/${url}`;
    }
  } catch (err) {
    return "";
  }
};
