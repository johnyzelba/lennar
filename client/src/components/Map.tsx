import GoogleMapReact from 'google-map-react';
import { Flight } from '../App';
import { Box } from '@mui/material';

const sxProps = {
	container: { height: '100vh', width: '100%' },
	plane: { fontSize: '24px' },
};

interface MarkerProps {
	lat: number;
	lng: number;
}

const Marker: React.FC<MarkerProps> = () => <Box sx={sxProps.plane}>✈︎</Box>;

export const SimpleMap = (props: { flights: Flight[] }) => {
	const { flights } = props;

	return (
		// Important! Always set the container height explicitly
		<Box sx={sxProps.container}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY || '' }}
				center={{
					lat: 10.99835602,
					lng: 77.01502627,
				}}
				zoom={1}
				draggable={false}
			>
				{flights?.map((flight) => (
					<Marker
						lat={flight.live.latitude}
						lng={flight.live.longitude}
					/>
				))}
			</GoogleMapReact>
		</Box>
	);
};
