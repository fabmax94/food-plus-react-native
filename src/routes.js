import React from 'react';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NewRecipe from './views/NewRecipe';
import ListRecipe from './views/ListRecipe';

const HorizontalTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    }
                ],
            }
        };
    },
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen
                    name="ListRecipe"
                    component={ListRecipe}
                    options={HorizontalTransition} />
                <Stack.Screen name="NewRecipe" component={NewRecipe} options={HorizontalTransition} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
