import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useState} from 'react';


const INITIAL_DATA = [
	{
		id: 1,
		title: 'Подготовка к обновлению курсов',
		text: 'Горные походы открывают удивительные природные ландшафты',
		date: new Date()
	},
	{
		id: 2,
		title: 'Поход в годы',
		text: 'Думал, что очень много времени',
		date: new Date()
	}
];

function App() {
	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			title: item.title,
			text: item.text,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
		}]);
	};


	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={items}/>
			</LeftPanel>
			<Body>
				<JournalForm onSabmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
