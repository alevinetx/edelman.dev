import * as React from "react";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanity from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanity);

function urlFor(source) {
  return builder.image(source);
}

export function Figure(props) {
  return <img src={urlFor(props.node).url()} />;
}
