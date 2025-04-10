import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import tw from 'tailwind-react-native-classnames';
import { ScrollView } from 'react-native';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity'; // Ensure urlFor is imported






const FeaturedRow = ({ title, description, id }) => 
        
        { const [restaurants, setResturants] = useState([]);

          useEffect(() => {
            sanityClient
              .fetch(
                `
              *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                  ...,
                  dishes[]->,
                  type->{
                    name
                  }
                },
                }[0]
              `,
                { id }
              )
              .then((data) => setResturants(data.restaurants));
          }, [id]);

       

       

      
        




  return (
    <View>
     <View style = {tw `mt-4 flex-row items-center justify-between px-4`}>
        <Text style = {tw `font-bold text-lg`}>{title}</Text>
        <ArrowRightIcon/>
    </View>

    <Text style = {tw `text-xs text-gray-500 px-4`}>{description}</Text>



    <ScrollView
    horizontal
    contentContainerStyle={{
        paddingHorizontal:15,
    }}
    showsHorizontalScrollIndicator={false}
    style = {tw `pt-4`}
    >

{restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            address={restaurant.address}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat}
          />

        ))}


   


  

     
        

    </ScrollView>
    </View>
  );
}

export default FeaturedRow

