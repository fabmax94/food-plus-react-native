import React, {useContext} from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NewRecipe from './views/NewRecipe';
import SignIn from './views/SignIn';
import ListRecipe from './views/ListRecipe';
import EditRecipe from './views/EditRecipe';
import DetailRecipe from './views/DetailRecipe';
import {ContextAuthProvider, ContextAuth} from './contexts/authContext';

const HorizontalTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const Stack = createStackNavigator();

const StackApp = () => {
  const {auth} = useContext(ContextAuth);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {auth.userToken ? (
          <>
            <Stack.Screen
              name="ListRecipe"
              component={ListRecipe}
              options={HorizontalTransition}
            />
            <Stack.Screen
              name="NewRecipe"
              component={NewRecipe}
              options={HorizontalTransition}
            />
            <Stack.Screen
              name="EditRecipe"
              component={EditRecipe}
              options={HorizontalTransition}
            />
            <Stack.Screen
              name="DetailRecipe"
              component={DetailRecipe}
              options={HorizontalTransition}
            />
          </>
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={HorizontalTransition}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ContextAuthProvider>
      <StackApp />
    </ContextAuthProvider>
  );
};

export default App;
