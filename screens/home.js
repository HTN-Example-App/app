import React, {useState, useEffect, useRef} from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import {Appbar, Searchbar, Text} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import Geolocation from 'react-native-geolocation-service';

const App = ({navigation}) => {
	const {colors} = useTheme();
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	});
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		Geolocation.getCurrentPosition(
			position => {
				setRegion({latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02});
			},
			error => {
				console.log(error.code, error.message);
			},
			{enableHighAccuracy: true, timeout: 1000, maximumAge: 10000}
		);
	}, []);

	useEffect(() => {
		(async () => {
			const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=1500&key=AIzaSyAjFi7v2y9Lk2KJ0Wff0bMdII1UJDaM9TU
`);
			const data = await response.json();

			setPlaces(data.results);
            	})();
	}, [region]);

	const renderContent = () => (
		<View
			style={{
				backgroundColor: 'white',
				padding: 16,
				height: '100%',
				width: '90%',
				alignSelf: 'center',
				borderRadius: 10
			}}
		>
			<Text style={{color: 'gray', fontWeight: 'bold', paddingBottom: 10}}>HISTORY</Text>
			<Text>The history is empty.</Text>
		</View>
	);

	const sheetRef = useRef(null);
	const items = ['red', 'yellow', 'green'];

	return (
		<>
			 <Appbar.Header style={{backgroundColor: colors.background}}>
				<Appbar.Content title="Easy Access" style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-start'}}/>
				<Appbar.Action
					icon="logout" onPress={() => {
						auth().signOut();
						navigation.navigate('Authentication');
					}}/>
			</Appbar.Header>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={{width: '100%', height: '100%', position: 'relative'}}
				region={region}
				onRegionChange={region => setRegion(region)}
			>
				{places.map(place => (
					<Marker
						key={place.place_id}
						coordinate={{
							latitude: place.geometry.location.lat,
							longitude: place.geometry.location.lng
						}}
						title={place.name}
						pinColor={items[Math.floor(Math.random() * items.length)]}
					/>
				))}
			</MapView>
			<BottomSheet
				ref={sheetRef}
				enabledBottomInitialAnimation
				snapPoints={['80%', 150]}
				initialSnap={1}
				borderRadius={10}
				renderContent={renderContent}
				renderHeader={() => <Searchbar placeholder="Search for a place..." style={{width: 370, borderRadius: 50, alignSelf: 'center', marginBottom: 10}} clearIcon="close"/>}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		alignItems: 'center'
	}
});

export default App;
