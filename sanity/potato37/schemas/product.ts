import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Товары',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Название',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Цена',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Альтернативный текст',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
