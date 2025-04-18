type RuleType = {
  required: () => { min: (n: number) => RuleType };
};

const product = {
  name: 'product',
  title: 'Товары',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Цена',
      type: 'number',
      validation: (Rule: RuleType) => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
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
      validation: (Rule: RuleType) => Rule.required().min(1),
    },
    {
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Горячие блюда', value: 'hot' },
          { title: 'Закуски', value: 'snacks' },
          { title: 'Напитки', value: 'drinks' },
          { title: 'Десерты', value: 'desserts' },
        ],
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
  ],
};

export const schemaTypes = [product];
