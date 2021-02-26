import S from "@sanity/desk-tool/structure-builder";
import { MdMenu } from "react-icons/md";
import { GoBrowser as PageIcon, GoHome, GoSettings } from "react-icons/go";
import blog from "./src/structure/blog";
import PreviewIFrame from "./src/components/previewIFrame";
import landingPages from "./src/structure/landing-pages";

const hiddenDocTypes = (listItem) => {
  return ![
    "route",
    "navigationMenu",
    "post",
    "page",
    "site-config",
    "author",
    "category",
  ].includes(listItem.getId());
};

export default () =>
  S.list()
    .title("Content")
    .items([
      S.documentListItem()
        .schemaType("site-config")
        .title("Site Settings")
        .icon(GoSettings)
        .child(
          S.document()
            .schemaType("site-config")
            .documentId("siteSettings")
            .views([S.view.form(), PreviewIFrame()])
        ),
      S.documentListItem()
        .title("Frontpage")
        .schemaType("page")
        .icon(GoHome)
        .child(
          S.document()
            .schemaType("page")
            .documentId("frontpage")
            .views([S.view.form(), PreviewIFrame()])
        ),
      blog,
      landingPages,
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
