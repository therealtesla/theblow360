import 'react-native-gesture-handler'
import {createDrawerNavigator} from '@react-navigation/drawer'
import MainScreen from './screen/MainScreen';




const Drawer = createDrawerNavigator();

export default function App(){

    return(
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name = "Main" component={MainScreen}/>


        </Drawer.Navigator>
    )
    



}