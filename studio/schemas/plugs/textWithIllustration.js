export default {
  type: "object",
  name: "textWithIllustration",
  fields: [
    {
      type: "string",
      name: "title",
    },
    {
      type: "simplePortableText",
      name: "text",
    },
    {
      type: "illustration",
      name: "illustration",
    },
  ],
};
