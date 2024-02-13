import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useEffect, useReducer} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';


function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;


	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			setTimeout(() => {
				console.log('Очистка состояния');
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 500);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit]);

	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE', payload: {
				[e.target.name]: e.target.value
			}
		}
		);
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};


	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input type='text' onChange={onChange} value={values.title} name='title'
					className={cn(styles['input-title'], {
						[styles['invalid']]: !isValid.title
					})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src='/date.svg' alt='иконка календаря'/>
					<span>Дата</span>
				</label>
				<input type='date' onChange={onChange} value={values.date} name='date' id="date"
					className={cn(styles['input'], {
						[styles['invalid']]: !isValid.date
					})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='/folder.svg' alt='иконка папки'/>
					<span>Метки</span>
				</label>
				<input type='text' id="tag" onChange={onChange} value={values.tag} name='tag'
					className={styles['input']}/>
			</div>

			<textarea name="post" onChange={onChange} value={values.post} id="" cols="30" rows="10"
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.post
				})}></textarea>
			<Button text="Cохранить"/>
		</form>
	);
}

export default JournalForm;