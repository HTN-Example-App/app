import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import {Text} from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';

import storage from '../storage';

const slides = [
	{
		key: 1,
		title: 'Search for accessible places near you.',
		backgroundColor: '#fff'
	},
	{
		key: 2,
		title: 'Write a review for places you have been to, to help your community.',
		backgroundColor: '#fff'
	},
	{
		key: 3,
		title: 'Read reviews left by other members in your community.',
		backgroundColor: '#fff'
	}
];

const App = ({navigation}) => {
	return (
		<AppIntroSlider
			renderItem={({item}) => (
				<View
					style={[
						styles.slide,
						{
							backgroundColor: item.backgroundColor
						}
					]}
				>
					<Text style={styles.title}>{item.title}</Text>
				</View>
			)}
			data={slides}
			onDone={async () => {
				await storage.setItem('isFirstRun', 'false');

				navigation.navigate('Authentication');
			}}
		/>
	);
};

const styles = StyleSheet.create({
	slide: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'blue',
		padding: 10
	},
	image: {
		width: 320,
		height: 320,
		marginVertical: 32
	},
	title: {
		fontSize: 22,
		color: 'black',
		textAlign: 'center'
	}
});

export default App;
