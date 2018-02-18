//first theme
//

const menu = {
	white: 'rgb(255, 255, 255)',
	headHeight: '45px',
	headPosition: 'fixed',
	mainTopOffset: '45px',
	menuWidth: '200px',
	menuHeight: '400px'
}

const color = {
	colorPrim: 'rgb(254,4,2)',
	colorSec: 'rgb(1,107,55)',
	colorTre: 'rgb(173, 173, 173)',
	colorQuad: 'rgb(199, 213, 48)',
	lightGrey: 'rgb(212, 212, 212)',
	darkGrey: 'rgb(115, 115, 115)'
}

const mainPage = {
}

const projectCard = {
	cardWidth: '365px',
	cardHeight: '400px'
}

const elem = {
	header: {
		textAlign: 'center',
		fontSize: '30px',
		padding: '20px'
	},
	projectCart: {
		
	}
}

const first = Object.assign({}, menu, color, mainPage, projectCard, elem);

export default first;
