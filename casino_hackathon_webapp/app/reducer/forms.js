import { combineForms } from 'react-redux-form';
import initialNewProjState from '../setup/initialNewProjState';
import initialDonateState from '../donateButton/initialDonateState';

const forms = combineForms({
		newProj: initialNewProjState,
	    donate: initialDonateState
}, 'forms');

export default forms;
