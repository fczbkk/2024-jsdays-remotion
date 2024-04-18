import {useEffect, useState} from 'react';
import {
	AbsoluteFill,
	cancelRender,
	continueRender,
	delayRender
} from 'remotion';

async function fetchBitcoinData () {
	const fetchUrl = 'https://openexchangerates.org/api/latest.json?' + (new URLSearchParams({
		app_id: '220e98f9bc5045acb90c1561d569eaa6',
		base: 'USD',
		symbols: 'BTC',
		prettyprint: 1
	}));

	return fetch(fetchUrl)
		.then(response => response.json())
		.then(data => data.rates.BTC);
}

export function Middle () {
	const [bitcoinExchangeRate, setBitcoinExchangeRate] = useState(0)
	const [delayHandler] = useState(() => delayRender('Fetching Bitcoin data'))

	useEffect(() => {
		fetchBitcoinData()
			.then((exchangeRate) => {
				setBitcoinExchangeRate(exchangeRate)
				continueRender(delayHandler)
			})
			.catch((error) => {
				cancelRender(error)
			})
	}, []);

	return (
		<AbsoluteFill style={{
			background: 'white',
			fontSize: '100px',
			fontFamily: 'Helvetica',
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<div>USD &rarr; BTC</div>
			<div>{bitcoinExchangeRate}</div>
		</AbsoluteFill>
	)
}
