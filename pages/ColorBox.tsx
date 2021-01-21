import SyntheticEvent, { useState, useEffect } from 'react'
import AccumulatedColor from './AccumulatedColor';
import Slider from '@material-ui/core/Slider';
import { useStyles } from './styles'
type rgb = [number, number, number];
type rgba = [number, number, number, number];


export default function ColorBox(props: { style?: object, label?: string }) {
	const { style = {}, label = "nan" } = props;
	const [alpha, setAlpha] = useState(1);
	const [color, setColor] = useState<rgb>([240, 240, 240]);
	const [bg, setBg] = useState<rgba>([240, 240, 240, 1]);
	const [bgStyle, setBgStyle] = useState({});
	const [textColor, setTextColor] = useState({ color: "black" })
	useEffect(() => {
		setBg([...color, alpha])
	}, [color, alpha])
	useEffect(() => {
		return () => {
			console.log(bg[3], "style", style, "font_col:", `rgb(${Math.abs((127.5 - bg[0]) * 2)},${Math.abs((127.5 - bg[1]) * 2)},${Math.abs((127.5 - bg[2]) * 2)})`);
			setBgStyle(Object.assign(
				{
					backgroundColor: `rgb(${bg[0]},${bg[1]},${bg[2]},${bg[3]})`,
					color: `rgb(${Math.abs((127.5 - bg[1]) * 2)},${Math.abs((127.5 - bg[2]) * 2)},${Math.abs((127.5 - bg[0]) * 2)})`
				},
				style))
		}
	}, [bg])
	useEffect(() => {
		return () => {
			console.log("bgStyle Changed", bgStyle, color, alpha, bg)
		}
	}, [bgStyle])
	const styles = useStyles()();
	const accColor = new AccumulatedColor()
	const handleChange = (e) => {
		console.log(e.target.value)
		const c = accColor.hexToColorType(e.target.value)
		setColor([c[0], c[1], c[2]]);
	}
	const handleAlphaChange = (e, v) => {
		setAlpha((v / 100))
		console.log(color, v / 100);
	}
	return (
		<>
			<div className={styles.div} style={bgStyle}>
				<p>{`${label}`}</p>
				<div style={{ width: '80%' }}>
					<label id="hex">color</label>
					<input aria-labelledby="hex" type="color" onChange={handleChange} />
					<label id="discrete-slider">alpha</label>
					<Slider
						defaultValue={100}
						//getAriaValueText={valuetext}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="on"
						step={1}
						min={0}
						max={100}
						onChange={handleAlphaChange}
					/>
				</div>
			</div>
		</>
	);
}
