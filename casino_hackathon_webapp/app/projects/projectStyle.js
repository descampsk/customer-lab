import theme from '../theme/params';

export let styles = {
	projectContainer: {
		// display: 'inline-block',
		marginTop: '15px',
		marginBottom: '15px',
		// width: '365px',
		height: '400px',
		boxShadow: '0 0 14px 1px #6d6d6d'
		//backgroundColor: 'red'
	},
	imgContainer: {
		position: 'relative',
		backgroundColor: 'rgba(0, 0, 255, 0.5)',
		height: '160px',
		overflow: 'hidden'
	},
	flag: {
		position: 'absolute',
		top: '0px',
		right: '0px'
	},
	info: {
		width: '100%',
		height: '150px',
		//backgroundColor: 'green',
		overflow: 'hidden'
	},
	name: {
		padding: '5px 10px',
		fontSize: '16px'
	},
	des: {
		padding: '0px 10px',
		fontSize: '12px',
		fontStyle: 'italic'
	},
	tags: {
		paddingTop: '7px',
		paddingLeft: '10px'
	},
	tagIcon: {
		marginRight: '10px'
	},
	tagInfo: {
		marginRight: '10px',
		display: 'inline-block'
	},
	geoloc: {
		paddingLeft: '10px'
	},
	geolocIcon: {
		marginRight: '10px'
	},
	detailFunding: {
		verticalAlign: 'center',
		margin: '2px 10px',
		borderTop: "solid 1px " + theme.lightGrey
	},
	progressContainer: {
		display: 'inline-block',
		margin: '3px 10px',
		width: '65%'
	},
	beginLabel: {
		float: 'left'
	},
	endLabel: {
		float: 'right'
	},
	progress: {
		textAlign: 'center'
	},
	more: {
		padding: '3px 2px',
		display: 'inline-block',
		cursor: 'pointer',
		float: 'right',
		textAlign: 'center'
	},
	seeMoreLabel: {
		marginBottom: '5px'
	},
	seeMoreImg: {
		display: 'inline-block',
	}
}
