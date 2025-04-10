import sanityClient from "@sanity/client";


import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId:"ah10sb69",
     dataset: 'production',
     useCdn:true,
     apiVersion:"2025-03-21",


});

async function getDishes() {
    const query = `*[_type == "dish"]`;
    const dishes = await client.fetch(query);
    return dishes;
  }
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source);

export default client;

 