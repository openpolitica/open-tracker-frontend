export const pageview = url => {
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return;
  }
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};
