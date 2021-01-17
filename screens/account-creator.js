import React, {useState} from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const App = ({navigation}) => {
	const [tags, setTags] = useState([]);
	const {colors} = useTheme();

	const onSubmit = async () => {
		await database().ref(`/users/${auth().currentUser.uid}`).set({
			tags
		});

		navigation.navigate('Home');
	};

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
						One more thing
					</Text>
					<Text style={styles.description}>
						Complete your account by providing some information about yourself.
					</Text>
				</View>
				<View style={styles.main}>
					<Button
						style={{
							borderWidth: 2,
							borderColor: tags.includes('Arthritis') ? 'green' : 'gray',
							borderRadius: 10,
							margin: 5
						}}
						type="outline"
						color={colors.text}
						onPress={() => {
							if (tags.includes('Arthritis')) {
								setTags(tags.filter(name => name !== 'Arthritis'));
							} else {
								setTags([...tags, 'Arthritis']);
							}
						}}
					>Arthritis
					</Button>
					<Button
						style={{
							borderWidth: 2,
							borderColor: tags.includes('Stroke') ? 'green' : 'gray',
							borderRadius: 10,
							margin: 5
						}}
						type="outline"
						color={colors.text}
						onPress={() => {
							if (tags.includes('Stroke')) {
								setTags(tags.filter(name => name !== 'Stroke'));
							} else {
								setTags([...tags, 'Stroke']);
							}
						}}
					>Stroke
					</Button>
					<Button
						style={{
							borderWidth: 2,
							borderColor: tags.includes('Sclerosis') ? 'green' : 'gray',
							borderRadius: 10,
							margin: 5
						}}
						type="outline"
						color={colors.text}
						onPress={() => {
							if (tags.includes('Sclerosis')) {
								setTags(tags.filter(name => name !== 'Sclerosis'));
							} else {
								setTags([...tags, 'Sclerosis']);
							}
						}}
					>Sclerosis
					</Button>
					<Button
						style={{
							borderWidth: 2,
							borderColor: tags.includes('Amputation') ? 'green' : 'gray',
							borderRadius: 10,
							margin: 5
						}}
						type="outline"
						color={colors.text}
						onPress={() => {
							if (tags.includes('Amputation')) {
								setTags(tags.filter(name => name !== 'Amputation'));
							} else {
								setTags([...tags, 'Amputation']);
							}
						}}
					>Amputation
					</Button>
					<Button
						style={{
							borderWidth: 2,
							borderColor: tags.includes('Spinal Cord Injury') ? 'green' : 'gray',
							borderRadius: 10,
							margin: 5
						}}
						color={colors.text}
						type="outline"
						onPress={() => {
							if (tags.includes('Spinal Cord Injury')) {
								setTags(tags.filter(name => name !== 'Spinal Cord Injury'));
							} else {
								setTags([...tags, 'Spinal Cord Injury']);
							}
						}}
					>Spinal Cord Injury
					</Button>
				</View>
				<Button
					style={{width: '90%', alignSelf: 'center', marginTop: 20}}
					mode="contained"
					disabled={tags.length === 0}
					onPress={onSubmit}
				>Finish
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	icon: {
		position: 'absolute',
		top: 15,
		right: 30
	},
	header: {
		paddingTop: 70,
		paddingLeft: 15
	},
	heading: {
		fontSize: 35,
		paddingBottom: 5
	},
	description: {
		color: '#777'
	},
	main: {
		paddingTop: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingLeft: 15
	}
});

export default App;
