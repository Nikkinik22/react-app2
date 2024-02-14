import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useContext, useEffect, useReducer, useRef} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';


function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const {userId} = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case!isValid.date:
			dateRef.current.focus();
			break;
		case!isValid.post:
			postRef.current.focus();
			break;
		}
	};


	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
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
	}, [isFormReadyToSubmit, values, onSubmit]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

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
				<Input type='text' ref={titleRef} isValid={isValid.title} onChange={onChange}
					value={values.title}
					name='title'
					appearence="title"/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src='/date.svg' alt='иконка календаря'/>
					<span>Дата</span>
				</label>
				<Input type='date' ref={dateRef} isValid={isValid.date} onChange={onChange} value={values.date}
					name='date' id="date"/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='/folder.svg' alt='иконка папки'/>
					<span>Метки</span>
				</label>
				<Input type='text' id="tag" onChange={onChange} value={values.tag} name='tag'/>
			</div>

			<textarea name="post" ref={postRef} onChange={onChange} value={values.post} id="" cols="30"
				rows="10"
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.post
				})}></textarea>
			<Button text="Cохранить"/>
		</form>
	);
}

export default JournalForm;