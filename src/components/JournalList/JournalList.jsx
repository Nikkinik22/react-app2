import './JournalList.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';

function JournalList({items}) {
	if (items.length === 0) {
		return <p>Записей пока нет</p>;
	}
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};


	return <>
		{items.sort(sortItems).map(el => (
			<CardButton key={el.id}>
				<JournalItem
					title={el.title}
					text={el.text}
					date={el.date}
				/>
			</CardButton>
		))}
	</>;
}

export default JournalList;