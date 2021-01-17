import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import WelcomeScreen from './screens/welcome';
import AuthScreen from './screens/auth';
import AccountCreator from './screens/account-creator';
import HomeScreen from './screens/home';

import storage from './storage';

const Stack = createStackNavigator();

const getTheme = async scheme => {
	switch (await storage.getItem('theme')) {
		case 'system':
		default:
			if (scheme === 'dark') {
				return DarkTheme;
			}

			return DefaultTheme;

		case 'dark':
			return DarkTheme;
		case 'light':
			return DefaultTheme;
	}
};

const App = () => {
	const [initializing, setInitializing] = useState(true);
	const [theme, setTheme] = useState();
	const [isFirstRun, setFirstRun] = useState();
	const colorScheme = useColorScheme();

	function onAuthStateChanged(_user) {
		if (initializing) {
			setInitializing(false);
		}
	}

	useEffect(() => {
		(async () => {
			setTheme(await getTheme(colorScheme));
			setFirstRun(await storage.getItem('isFirstRun'));
		})();

		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // Unsubscribe on unmount
	}, []);

	if (initializing) {
		return null;
	}

	return (
		<PaperProvider>
			<NavigationContainer theme={theme}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
				>
                    {isFirstRun === 'true' && <Stack.Screen name="Welcome" component={WelcomeScreen} />}
					<Stack.Screen name="Authentication" component={AuthScreen}/>
					<Stack.Screen name="Account Creator" component={AccountCreator}/>
					<Stack.Screen name="Home" component={HomeScreen}/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
