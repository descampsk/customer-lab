import theme from '../theme/params';

export let styles = {
	projectContainer: {
	},
	coverContainer: {
		position: 'relative',
	    backgroundImage: 'url(../pics/bapbap_project.png)',
	    backgroundSize: 'cover',
	},
	coverImg: {
		width: '100%',
		// height: '540px',
		//background: 'blue'
	},
	infoContainer: {
		position: 'absolute',
		padding: '20px',
		bottom: '0px',
		left: '0px'
	},
	videoContainer: {
		// backgroundColor: theme.colorSec,
		// width: '650px',
		// height: '410px',
		marginTop:'20px',
		marginBottom:'20px',
		// paddingTop: '10px',
		// paddingBottom: '10px',
		/* position: absolute; */
	    /* left: 0px; */
	    /* top: 0px; */
	    /* margin: 50px 60px; */
	},
	coverCard: {
		//backgroundColor: theme.colorPrim,
		marginTop:'20px',
		backgroundColor: 'rgba(255, 255, 255, 0.88)',
		boxShadow: 'rgb(109, 109, 109) 0px 0px 14px 1px',

		// width: theme.cardWidth,
		// height: '440px',
		// position: 'absolute',
		// right: '0px',
		// top: '0px',
		// margin: '50px 60px'

	},
	projectNameCard: {
		fontSize: '30px',
		textAlign: 'center',
		padding: '15px 30px'
	},
	descriptionCard: {
		fontSize: '15px',
		fontStyle: 'italic',
		padding: '10px'
	},
	tagsCardContainer: {
		padding: '0px 10px'
	},
	tagCard: {
		display: 'inline-block',
		marginRight: '10px'
	},
	tagIcon: {
		marginRight: '10px'
	},
	geolocCard: {
		padding: '0px 10px'
	},
	geolocIcon: {
		marginRight: '10px'
	},
	cardFooter: {
		// position: 'absolute',
		bottom: '10px',
		width: '100%'
	},
	progressBarContainer: {
		padding: '15px'
	},
	detailPanelContainer: {
		marginTop: '15px'
	},
	detailHeader: {
		// margin: '10px',
		borderBottom: 'solid 1px ' + theme.lightGrey
	},
	detailHeaderButton: {
		display: 'inline-block',
		padding: '5px 50px'
	},
	panelHeaderActive: {
		display: 'inline-block',
		paddingBottom: '5px',
		borderBottom: 'solid 1px ' + theme.darkGrey
	},
	panelHeader: {
		display: 'inline-block',
		paddingBottom: '5px',
	},
	panelHeaderHover: {
		borderBottom: 'solid 1px ' + theme.darkGrey
	},
	detailView: {
		padding: '5px 10px'
	},
	detailViewHeader: {
		fontSize: '20px',
		margin: '45px 0px',
		// display: 'inline-block',
		borderBottom: 'solid 1px ' + theme.lightGrey
	},
	detailViewMain: {
		fontSize: '18px'
	}
}
