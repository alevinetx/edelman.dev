import * as React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { useRouter } from "next/router";
import { Category, MainImage } from "../lib/schema";
import * as DataHooks from "../hooks";
import simg from "../lib/sanity";

export function SEO(props: SEOProps) {
  const router = useRouter();

  const settings = DataHooks.useSiteSettings();
  const canonical = `${settings.url}${router.asPath}`;
  const title = `${settings.title} | ${props.title}`;
  const ogImages = props.images.map(buildOgImage);

  return (
    <>
      <ArticleJsonLd
        url={canonical}
        title={title}
        images={ogImages.map((i) => i.url)}
        datePublished={props.datePublished}
        dateModified={props.dateModified}
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
  dateModified?: string;
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
