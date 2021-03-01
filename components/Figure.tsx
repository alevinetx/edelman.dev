import * as React from "react";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanity from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanity);

function urlFor(source) {
  const t = builder.image(source).url();
  // console.log(t);
  return builder.image(source);
}

const myLoader = (props) => {
  // console.log("loader props", props);
  return `${props.src}&w=${props.width}`;
};

export function Figure(props) {
  urlFor(props.node);
  const { loader, ...rest } = useNextSanityImage(sanity, props.node);
  // console.log(props);

  return (
    <Img {...rest} loader={myLoader} sizes="(max-width: 800px) 100vw, 800px" />
  );
}
