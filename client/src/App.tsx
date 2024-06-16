import { useEffect, useState } from 'react';
import { SimpleMap } from './components/Map';
import { Alert, Box, Snackbar } from '@mui/material';

export type Flight = {
	live: {
		latitude: number;
		longitude: number;
		direction: number;
	};
};

function App() {
	const [error, setError] = useState<unknown>();
	const [flights, setFlights] = useState<Flight[]>([]);

	const getData = async () => {
		try {
			const response = await fetch(
				`http://api.aviationstack.com/v1/flights?access_key=${process.env.REACT_APP_AVIATIONSTCK_API_KEY}&offset=100&flight_status=diverted`
			);
			if (!response.ok) {
				throw new Error('response fail');
			}
			const jsonData = (await response.json())?.data;
			setFlights(jsonData?.filter((data: any) => data.live !== null));
		} catch (e) {
			setError(e);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			getData();
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Box
			className="App"
			sx={{ overflow: 'hidden' }}
		>
			<SimpleMap flights={error ? [] : flights} />
			<Snackbar
				open={!!error}
				message="Note archived"
			>
				<Alert
					icon={false}
					severity="error"
				>
					Oops, something went wronng
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default App;
