import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../card';

import './style.css';

export const WrapperCards = ({ cardsData, finish }) => {
	const nameSelect = useRef('')
	const [cards, setCards] = useState(cardsData)

	useEffect(() => {
		let timeout = 0;
		const funTimeuot = () => {
			setCards(cards.map(item => ({...item, isOpen: false})));
			clearTimeout(timeout);
		};

		timeout = setTimeout(funTimeuot, 1500)
	}, []);

	const handleClick = ({id, image}) => {
		let newCards = [];

		if (nameSelect.current) {
			newCards = nameSelect.current === image ? coincidence(cards, image) : closeAll(cards)
			nameSelect.current = '';
		} else {
			newCards = oneOpen(cards, id)
			nameSelect.current = image;
		}
		
		setCards(newCards);

		const isFinish = newCards.every(item => item.isSelect === true);
		if (isFinish) {
			let timeout = setTimeout(() => {
				finish(true);
				clearTimeout(timeout)
			}, 1500);
		}
	}

	return (
		<div className={'wrapper'}>
			{cards.map(item => <Card key={item.id} {...item} handleClick={handleClick}/>)}
		</div>
	)
}

const coincidence = (arr, image) => {
	return arr.map(item => {
		if (item.image === image) {
			return {...item, isOpen: true, isSelect: true};
		} else {
			return item
		}
	})
}

const closeAll = (arr) => {
	return arr.map(item => {
		if (item.isSelect) {
			return item;
		} else {
			return { ...item, isOpen: false }
		}
	})
}

const oneOpen = (arr, id) => {
	return arr.map(item => {
		if (item.id === id) {
			return { ...item, isOpen: true };
		}

		return item;
	});
}