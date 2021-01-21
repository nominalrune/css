import ColorBox from './ColorBox';

export default function FourColorBox() {
	const style = {
		c1: {
			position: "absolute",
			top: "0px",
			left: "0px",
			zIndex: 10,
		},
		c2: {
			position: "absolute",
			top: "0px",
			left: "96px",
			zIndex: 9,
		},
		c3: {
			position: "absolute",
			top: "96px",
			left: "0px",
			zIndex: 8,
		},
		c4: {
			position: "absolute",
			top: "96px",
			left: "96px",
			zIndex: 6,
		},
	}
	return (
		<>
			<ColorBox key="c1" label="box1" style={style.c1} />
			<ColorBox key="c2" label="box2" style={style.c2} />
			<ColorBox key="c3" label="box3" style={style.c3} />
			<ColorBox key="c4" label="box4" style={style.c4} />
		</>
	)
}