export default {
  name: 'contacts',
  type: 'document',
  title: 'Контакты',
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
      name: 'address',
      type: 'string',
      title: 'Адрес',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Телефон',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Электронная почта',
    },
    {
      name: 'workHours',
      type: 'array',
      title: 'Часы работы',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'days', type: 'string', title: 'Дни'},
            {name: 'hours', type: 'string', title: 'Часы'},
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Социальные сети',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Название'},
            {name: 'url', type: 'url', title: 'Ссылка'},
          ],
        },
      ],
    },
    {
      name: 'mapLocation',
      type: 'string',
      title: 'Координаты для карты (формат: широта,долгота)',
    },
  ],
}
