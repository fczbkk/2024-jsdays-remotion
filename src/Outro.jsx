import {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolate,
	random,
	Sequence, useCurrentFrame,
	useVideoConfig,
	Easing
} from 'remotion';

function ThumbUp ({left, top, from}) {
	const frame = useCurrentFrame()
	const scale = interpolate(frame, [from, from + 10], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.elastic(3)})
	return (
		<Sequence from={from} durationInFrames={10}>
		<div style={{
			position: 'absolute',
			left: `${left}px`,
			top: `${top}px`,
			transform: `scale(${scale})`
		}}>👍</div>
		</Sequence>
	)
}

export function Outro (factory, deps) {
	const {width, height, durationInFrames} = useVideoConfig()
	const thumbs = useMemo(() => {
		return Array(100).fill(true).map((_, index) => {
			const left = random('left' + index) * width
			const top = random('top' + index) * height
			const from = random('from' + index) * durationInFrames
			return <ThumbUp left={left} top={top} from={from} />
		})
	}, deps)

	return (
		<AbsoluteFill style={{
			background: 'white',
			fontSize: '100px',
			fontFamily: 'Helvetica',
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<div>Like and subscribe</div>
			{thumbs}
		</AbsoluteFill>
	)
}
