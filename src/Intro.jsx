import {
	AbsoluteFill, Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig
} from 'remotion';

export function Intro () {
  const {durationInFrames, height} = useVideoConfig()
	const frame = useCurrentFrame()

	const titleOpacity = interpolate(
		frame,
		[0, durationInFrames / 3],
		[0, 1],
		{}
	)

	const subtitlePosition = interpolate(
		frame,
		[durationInFrames / 3, (durationInFrames / 3) * 2],
		[height / 2, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bounce
		}
	)

	return (
		<AbsoluteFill style={{
			background: 'white',
			fontSize: '100px',
			fontFamily: 'Helvetica',
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<div style={{
				opacity: titleOpacity
			}}>CryptoNews</div>
			<div style={{
				fontSize: '50px',
				transform: `translateY(${subtitlePosition}px)`
			}}>Automatic daily news about Bitcoin prices</div>
		</AbsoluteFill>
	)
}
