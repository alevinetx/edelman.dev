import { createDataHook } from "next-data-hooks";
import { Route, Post, Category } from "../lib/schema";
import sanity from "../lib/sanity-client";
import { Slug } from "@sanity/types";

export const useContentCategories = createDataHook(
  "ContentCategories",
  async (context) => {
    return await sanity.getAll("category");
  }
);

export const useContentCategory = createDataHook(
  "ContentCategory",
  async (context) => {
    return await sanity.query<{
      _id: string;
      _rev: string;
      _type: string;
      _updatedAt: string;
      _createdAt: string;
      title: string;
      description: string;
      slug: Slug;
      content: Post[];
    }>(
      `*[_type == "category" && slug.current == "${context.params.slug}"]{_id, _rev, _type, description, slug, title, _createdAt, _updatedAt, "content": *[references(^._id)]}`
    );
  }
);
