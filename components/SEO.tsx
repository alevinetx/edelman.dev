import * as React from "react";
import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { useRouter } from "next/router";
import simg from "../lib/sanity";

import * as DataHooks from "../hooks";
import { Category, MainImage, SanityImage } from "../lib/schema";

export const builder = imageUrlBuilder(simg);

function buildOgImage(img: MainImage): OGImage {
  let result: OGImage = {
    url: builder.image(img).width(800).height(600).url(),
    height: 600,
    width: 800,
    alt: img.alt,
  };

  return result;
}

export type OGImage = {
  url: string;
  height: number;
  width: number;
  alt: string;
};

export interface SEOProps {
  title: string;
  description: string;
  tags: Category[];
  pageAuthor: string[];
  datePublished: string;
  twitter: {
    site: string;
    cardType: string;
    handle: string;
  };
  images: MainImage[];
  og: {
    type: string;
    [index: string]: string;
  };
  jsonLD?: { [index: string]: any };
  seo?: { [index: string]: any };
}

export function SEO(props: SEOProps) {
  const router = useRouter();
  const settings = DataHooks.useSiteSettings();

  const canonical = `${settings.url}${router.pathname}`;
  const title = `${settings.title} | ${props.title}`;
  const ogImages = props.images.map(buildOgImage);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>
      <ArticleJsonLd
        url={canonical}
        title={title}
        images={ogImages.map((i) => i.url)}
        datePublished={props.datePublished}
        authorName={props.pageAuthor}
        description={props.description}
        publisherName={"Michael Edelman"}
        publisherLogo={builder.image(settings.logo).url()}
        {...props.jsonLD}
      />
      <NextSeo
        title={title}
        description={props.description}
        canonical={canonical}
        twitter={props.twitter}
        openGraph={{
          url: canonical,
          title: title,
          site_name: settings.title,
          type: props.og.type,
          images: ogImages,
          ...props.og,
        }}
        {...props.seo}
      />
    </>
  );
}
