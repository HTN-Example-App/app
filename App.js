import React from 'react';
import {
	StyleSheet,
	View,
	StatusBar
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content"/>
			<View
				contentInsetAdjustmentBehavior="automatic"
				style={styles.container}
			>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					region={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121
					}}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

export default App;
