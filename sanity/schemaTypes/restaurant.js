import {defineField, defineType} from 'sanity'

export default defineType({
  name: "restaurant",
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant name',
      type: 'string',
      validation :(Rule)=>Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      options: {
        source: 'title',
        maxLength: 200,
      },
    }),
    
    defineField({
      name: 'image',
      title: 'Image of the Restaurant',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of the restaurant',
      type: 'number',
    
    }),
    defineField({
      name: 'long',
      title: 'Longitude of the restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
      validation:(Rule)=>Rule.required(),
    }),


    defineField({
      name: 'rating',
      title: 'Enter a Rating from (1-5 stars)',
      type: 'number',
      validation:(Rule)=>Rule.required()
      .min(1)
      .max(5)
      .error("Please enter a value between 1 and 5"),

    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'reference',
      to:[{type:"category"}],
      validation:(Rule)=>Rule.required(),
    }),

    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    }),
   
  
    
  ], 

 
})