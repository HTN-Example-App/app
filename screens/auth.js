import React, {useState, useEffect} from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Pressable,
	Image
} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-community/google-signin';
import database from '@react-native-firebase/database';

GoogleSignin.configure({
	webClientId: '766496770635-c3q8e2dg7add9qnbssg0454nu6o661a8.apps.googleusercontent.com'
});

async function onAppleButtonPress() {
	// 1). start a apple sign-in request
	const appleAuthRequestResponse = await appleAuth.performRequest({
		requestedOperation: appleAuth.Operation.LOGIN,
		requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
	});

	// 2). if the request was successful, extract the token and nonce
	const {identityToken, nonce} = appleAuthRequestResponse;

	// Can be null in some scenarios
	if (identityToken) {
		// 3). create a Firebase `AppleAuthProvider` credential
		const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

		// 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
		//     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
		//     to link the account to an existing user
		const userCredential = await auth().signInWithCredential(appleCredential);

		// User is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
		console.warn(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);
	} else {
		// Handle this - retry?
	}
}

async function onGoogleButtonPress() {
	// Get the users ID token
	const {idToken} = await GoogleSignin.signIn();

	// Create a Google credential with the token
	const googleCredential = auth.GoogleAuthProvider.credential(idToken);

	// Sign-in the user with the credential
	return auth().signInWithCredential(googleCredential);
}

const App = ({navigation}) => {
	const [isLoading, setLoading] = useState(true);
	const {colors} = useTheme();

	useEffect(() => {
		(async () => {
			if (!auth().currentUser) {
				setLoading(false);
			} else {
				const data = await database().ref(`/users/${auth().currentUser.uid}`).once('value');

				if (data.val()?.tags) {
					navigation.navigate('Home');
				} else {
					navigation.navigate('Account Creator');
				}
			}
		})();
	}, []);

	const onLogin = async () => {
		const data = await database().ref(`/users/${auth().currentUser.uid}`).once('value');

		if (data.val()?.tags) {
			navigation.navigate('Home');
		} else {
			navigation.navigate('Account Creator');
		}
	};

	if (isLoading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
				<ActivityIndicator animating/>
			</View>
		);
	}

	return (
		<SafeAreaView>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={styles.container}
			>
				<View style={styles.header}>
					<Text
						style={{
							...styles.heading,
							color: colors.text
						}}
					>
						Welcome
					</Text>
					<Text style={styles.description}>
						Continue by choosing one of your favorite services.
					</Text>
				</View>
				<View style={styles.buttons}>
					{appleAuth.isSupported && (
						<AppleButton
							buttonStyle={AppleButton.Style.BLACK}
							buttonType={AppleButton.Type.CONTINUE}
							style={{
								width: 350,
								height: 52,
								marginTop: 30
							}}
							onPress={() => onAppleButtonPress().then(onLogin)}
						/>
					)}
					<Pressable
						onPress={() => onGoogleButtonPress().then(onLogin)}
					>
						<Image
							style={{width: 350, height: 52, marginTop: 10}}
							source={require('../assets/google-signin.png')}
						/>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%'
	},
	icon: {
		position: 'absolute',
		top: 15,
		right: 30
	},
	header: {
		paddingTop: 70,
		paddingLeft: 30
	},
	heading: {
		fontSize: 35
	},
	description: {
		color: '#777'
	},
	buttons: {
		height: '100%',
		width: '100%',
		alignItems: 'center'
	}
});

export default App;
