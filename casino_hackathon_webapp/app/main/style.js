import theme from '../theme/params';

export let styles = {
	mainContainer: {

	},
	header: {
		textAlign: 'center',
		fontSize: '30px',
		padding: '20px'
	},
	subHeader: {
		textAlign: 'center',
		fontSize: '23px',
		padding: '15px',
		fontStyle: 'italic'
	},
	projectsContainer: {
	},
	catList: {
		paddingLeft: '10px',
		paddingRight: '10px',
		// marginTop: '35px',
		borderBottom: 'solid 1px ' + theme.lightGrey
	},
	cat: {
		display: 'inline-block',
		padding: '14px',
	},
	catHover: {
		borderBottom: 'solid 1px ' + theme.darkGrey
	},
	catActive: {
		display: 'inline-block',
		padding: '14px',
		borderBottom: 'solid 1px ' + theme.darkGrey
	},
	projectsList: {
		// margin: '20px 8px'
	},
	illustrationImage: {
		width: '100%',
		height: '400px',
		backgroundColor: theme.colorQuad
	}
}
