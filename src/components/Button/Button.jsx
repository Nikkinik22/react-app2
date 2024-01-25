import './Button.css';
import {useState} from 'react';

function Button() {
	// let text = 'Сохранить';
	const [text, setText] = useState('Сохранить');
	const clicked = () => {
		setText('Закрыть');
		console.log('Привет!');
	};

	return (
		<button onClick={clicked} className="button accent">{text}</button>
	);
}

export default Button;