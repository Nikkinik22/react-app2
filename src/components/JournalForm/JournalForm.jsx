import './JournalForm.css';
import {useState} from 'react';
import Button from '../Button/Button.jsx';


function JournalForm() {

	const [inputData, setInputData] = useState('');
	
	const inputChanges = (event) => {
		setInputData(event.target.value);
		console.log(inputData);
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
	};


	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title'/>
			<input type='date' name='date'/>
			<input type='text' name='tag' value={inputData} onChange={inputChanges}/>
			<textarea name="post" id="" cols="30" rows="10"></textarea>
			<Button text="Cохранить" onClick={() => {
				console.log('Нажали');
			}}/>
		</form>
	);
}

export default JournalForm;