import Head from 'next/head';

export default function DynamicHead(meta) {
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" key="robots" />
      <meta content={meta.description} name="description" key="description" />
      <meta property="og:url" content={meta.websiteUrl} key="og-url" />
      <link rel="canonical" href={meta.websiteUrl} key="canonical" />
      <meta property="og:type" content={meta.type} key="og-type" />
      <meta property="og:site_name" content={meta.title} key="og-site-name" />
      <meta
        property="og:description"
        content={meta.description}
        key="org-description"
      />
      <meta property="og:title" content={meta.title} key="og-title" />
      <meta property="og:image" content={meta.image} key="og-type" />
      <meta name="twitter:card" content="summary_large_image" key="tw-card" />
      <meta name="twitter:site" content="@openpolitica" key="tw-site" />
      <meta name="twitter:title" content={meta.title} key="tw-title" />
      <meta
        name="twitter:description"
        content={meta.description}
        key="tw-description"
      />
      <meta name="twitter:image" content={meta.image} key="tw-image" />
    </Head>
  );
}
