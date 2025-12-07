// schemas/work.ts
export default {
  name: "work",
  title: "Portfolio Work",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Motion Graphics", value: "Motion Graphics" },
          { title: "Animation", value: "Animation" },
          { title: "3D Animation", value: "3D Animation" },
          { title: "Showreel", value: "Showreel" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "video",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      description: "Show this work in the Latest Works carousel",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "thumbnail",
    },
    prepare({ title, category, media }: any) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
};
