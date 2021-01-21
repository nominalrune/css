import { makeStyles } from '@material-ui/core/styles';
export function useStyles(bgColor?: string) {
	return makeStyles({
		div: {
			height: 128,
			width: 128,
			borderRadius: 12,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			//backgroundColor:bgColor
		},
	})
};