import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Категории',
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
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Порядок отображения',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
