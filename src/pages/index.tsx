import React from 'react';
import Head from 'next/head';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Arrienda el Depa ideal para ti sin complicaciones</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Déjanos tus datos, nuestro algoritmo hará el trabajo por ti. Te notificaremos cuando el departamento perfecto esté disponible."
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Arrienda el Depa ideal para ti sin complicaciones"
          key="title"
        />
        <meta
          property="og:description"
          content="Déjanos tus datos, nuestro algoritmo hará el trabajo por ti. Te notificaremos cuando el departamento perfecto esté disponible."
        />
        <meta property="og:image" content="/openGraph.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Config SEO */}
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
}
