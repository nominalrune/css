export type color = [number, number, number, number?];
type hex = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "A" | "B" | "C" | "D" | "E" | "F"
const hex1 = ():hex => {
	const ran = +(Math.random() * 16).toFixed(0);
	const ch:hex[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	if (ran in ch) {
		return ch[ran]
	}
}

const hex3=()=>{const _hex3:[hex, hex, hex]= [hex1(),hex1(),hex1()];
	_hex3
}
type hexColorType = [hex, hex, hex]
//class Color extends Array<number> {
//	private color: color;
//	constructor(r: number, g: number, b: number, a: number = 1) {
//		super();
//		this.color = [r, g, b, a];
//	}
//	getRed() { return this.color[0] };
//	getGreen() { return this.color[1] };
//	getBlue() { return this.color[2] };
//	getAlpha() { return this.color[3] };
//}

export default class AccumulatedColor {
	private accColor: color = [0, 0, 0];
	private effectRate = 1;

	getRGB() {
		const [r, g, b] = this.accColor;
		return `rgb(${r},${g},${b})`
	};

	stackEffectRate(a: number) {
		if (0 <= a && a <= 1) {
			this.effectRate *= a;
			console.log("effectRate", this.effectRate)
		}
	}

	isValid(color: color) {
		const [r, g, b, a = 1] = color;
		return (
			0 <= r && r < 256
			&& 0 <= g && g < 256
			&& 0 <= b && b < 256
			&& 0 <= a && a <= 1
		)
	}
	whichHex=(hex:string)=>{
		if(hex[0]!=="#"){return 0}
		if(hex.length<10){return hex.length}
		else {return 0}
	}
	hexToColorType(hex: string): color {
		let r = 0, g = 0, b = 0, a = 1;
		const setter = (i0: number, i1: number) => parseInt("0x" + hex[i0] + hex[i1]) || 0
		const alphaSetter = (i0: number, i1: number) => (+(parseInt("0x" + hex[i0] + hex[i1]) / 255).toFixed(3) || 0)
		if (this.whichHex(hex)=== 4) {
			r = setter(1, 1);
			g = setter(2, 2);
			b = setter(3, 3);
		} else if (this.whichHex(hex)=== 7) {
			r = setter(1, 2);
			g = setter(3, 4);
			b = setter(5, 6);
		} else if (this.whichHex(hex)=== 5) {
			r = setter(1, 1);
			g = setter(2, 2);
			b = setter(3, 3);
			a = alphaSetter(4, 4);
		} else if (this.whichHex(hex)=== 9) {
			r = setter(1, 2);
			g = setter(3, 4);
			b = setter(5, 6);
			a = alphaSetter(6, 8);
		} else { this.throwError(hex) };
		!this.isValid([r, g, b, a]) && this.throwError([r, g, b, a]);
		return [r, g, b, a]
	}

	private throwError(arg: unknown) { throw new Error(`this is not a required format. : ${arg}`); };


	addColor([r, g, b, a = 1]: color) {
		const [_r, _g, _b] = this.accColor;
		if (this.isValid([r, g, b, a])) {
			this.stackEffectRate(a);
			this.accColor = [r * this.effectRate + _r, g * this.effectRate + _g, b * this.effectRate + _b];
			if (a === 1) { this.effectRate = 0; };
			if (!this.isValid(this.accColor)) { this.throwError(this.accColor); }
			return this.accColor;
		} else { this.throwError([r, g, b, a]); }
	};

	calcColor(...colors: color[]) {
		colors.forEach(
			(color) => {
				if (color.length === 3 || color.length === 4) {
					if (this.isValid(color)) {
						this.addColor(color);
					}
				} else { this.throwError(color); }
			}
		);
		return this.accColor;
	};

	constructor(...colors: color[] | undefined) {
		if (colors) { this.calcColor(...colors) };
	}
}
