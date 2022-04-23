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
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';

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
  const {auth, isLoading} = useContext(ContextAuth);
  if (isLoading) {
    return (
      <View style={styles.contentImage}>
        <FastImage
          source={require('./assets/app_icon.png')}
          style={styles.image}
        />
      </View>
    );
  }
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

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  contentImage: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
