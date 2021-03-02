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
  return `${props.src}&w=${props.width}&q=50`;
};

export function Figure(props) {
  const { loader, ...rest } = useNextSanityImage(sanity, props.node);

  return (
    <Img
      {...rest}
      loader={myLoader}
      sizes="(max-width: 800px) 100vw, 800px"
      alt={props.node.alt}
    />
  );
}
