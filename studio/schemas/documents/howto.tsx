export const HowToStep = {
  name: "howtoStep",
  title: "How-To Step",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "howtoStepPortableText",
    },
  ],
};

export default {
  name: "howto",
  title: "How-To",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "simplePortableText",
    },

    {
      name: "step",
      title: "Steps",
      type: "array",
      of: [{ type: "howtoStep" }],
    },
  ],
};
