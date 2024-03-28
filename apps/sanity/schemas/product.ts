import {defineField, defineType} from 'sanity'

const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image',
      type: 'image',
    }),
  ],
})

export default product
