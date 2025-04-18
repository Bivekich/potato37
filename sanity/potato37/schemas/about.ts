export default {
  name: 'about',
  type: 'document',
  title: 'О нас',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Заголовок',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Подзаголовок',
    },
    {
      name: 'description',
      type: 'array',
      title: 'Описание',
      of: [{type: 'block'}],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Изображение',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Альтернативный текст',
        },
      ],
    },
    {
      name: 'teamTitle',
      type: 'string',
      title: 'Заголовок блока команды',
    },
    {
      name: 'teamMembers',
      type: 'array',
      title: 'Члены команды',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Имя'},
            {name: 'position', type: 'string', title: 'Должность'},
            {
              name: 'photo',
              type: 'image',
              title: 'Фото',
              options: {hotspot: true},
              fields: [{name: 'alt', type: 'string', title: 'Альтернативный текст'}],
            },
          ],
        },
      ],
    },
  ],
}
