import theme from '../theme/params';

export let styles = {
	main: {
		position: theme.headPosition,
		width: '100%',
		height: theme.headHeight,
		backgroundColor: '#65A388',
		zIndex: '200',
		boxShadow: '0px 1px 8px 0px #646464'
	},
	menuContainer: {
		backgroundColor: theme.white,
		boxShadow: '0 0 20px 0px #696969cf',
		width: theme.menuWidth,
		height: theme.menuHeight,
		position: 'absolute',
		top: theme.mainTopOffset,
		left: '0px'
	},
	menuHeader: {
		fontSize: '22px',
		padding: '5px',
		margin: '5px',
		borderBottom: '3px solid ' + theme.colorPrim
	},
	menuItem: {
		padding: '5px',
		margin: '20px 5px',
		fontSize: '18px',
		cursor: 'pointer',
		':hover': {
			borderBottom: '2px solid ' + theme.colorPrim,
			padding: '4px',
		}
	},
	menuButton: {
		position: 'relative',
		top: '0px',
		left: '0px',
		margin: '5px',
		display: 'inline-block'
	},
	userDropdown: {
		// display: 'inline-block',
		// marginLeft: '30px',
		// cursor: 'pointer'
		overflow: 'hidden',
    	marginTop: '14px',
	},
	dropdown: {
		width: '355px',
		padding: '10px',
		// marginLeft: '70px',
		backgroundColor: 'white',
		boxShadow: 'rgb(109, 109, 109) 0px 0px 14px 1px'
	},
	userKey: {
		padding: '4px 0px',
		cursor: 'pointer'
	},
	userToken: {
		// display: 'inline-block',
		// float: 'right',
		// width: '123px',
		padding: '4px 13px',
		margin: '4px',
		//border: 'solid 1px black',
		borderRadius: '10px',
		fontSize: '18px'
	},
	userTokenFirst: {
		color: 'rgb(84, 84, 84)',
		backgroundColor: 'rgba(109, 109, 109, 0.36)',
	},
	userTokenSecond: {
		color: 'rgb(255, 255, 255)',
		backgroundColor: 'rgb(0, 134, 69)',
		// marginRight: '50px'
	},
	coinLogo: {
		float: 'right'
	}
}
