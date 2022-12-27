import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AdScreen from './screens/AdScreen';
import CartScreen from "./screens/CartScreen";
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Estate Market' component={HomeScreen} />
                    <Stack.Screen name='Объявление' component={AdScreen} />
                    <Stack.Screen name='Корзина' component={CartScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
