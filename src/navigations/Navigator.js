import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register'
import HomeScreen from '../screens/HomeScreen';
//import MainContainer from '../../Navigation/MainContainer';
//import MainContainer from '../../Navigation/MainContainer';





const stackNavigatorOptions = {
    headerShown:false
}
const AppNavigator = createStackNavigator({
    //Login:{screen:Login},
    //Register:{screen:Register},
    HomeScreen:{screen:HomeScreen},

},
{
    defaultNavigationOptions : stackNavigatorOptions
}  
);
export default createAppContainer(AppNavigator);