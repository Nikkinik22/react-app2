import './JournalForm.css';
import Button from '../Button/Button.jsx';


function JournalForm({onSabmit}) {
	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		onSabmit(formProps);
	};


	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title'/>
			<input type='date' name='date'/>
			<input type='text' name='tag'/>
			<textarea name="text" id="" cols="30" rows="10"></textarea>
			<Button text="Cохранить" onClick={() => {
				console.log('Нажали');
			}}/>
		</form>
	);
}

export default JournalForm;