import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../card';

import './style.css'; // Подключение стилей

export const WrapperCards = ({ cardsData, finish }) => {
	const nameSelect = useRef('') // Сохранения результата предидущего выбора
	const [cards, setCards] = useState(cardsData) // Переменная для хранения карточек
// закрытие всех карточек через 1ю5 сек после инициализации компонента
	useEffect(() => {
		let timeout = 0;
		const funTimeuot = () => {
			setCards(cards.map(item => ({...item, isOpen: false})));
			clearTimeout(timeout);
		};

		timeout = setTimeout(funTimeuot, 1500)
	}, []);

// Обработка нажатия на крточку
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
// Возврат размметки для отображения контейнера с карточками
	return (
		<div className={'wrapper'}>
			{cards.map(item => <Card key={item.id} {...item} handleClick={handleClick}/>)}
		</div>
	)
}
// Обработка сохранения совпавших карточек
const coincidence = (arr, image) => {
	return arr.map(item => {
		if (item.image === image) {
			return {...item, isOpen: true, isSelect: true};
		} else {
			return item
		}
	})
}
// Обработка закрытия открытых карточкек
const closeAll = (arr) => {
	return arr.map(item => {
		if (item.isSelect) {
			return item;
		} else {
			return { ...item, isOpen: false }
		}
	})
}
// Обработка открытия карточки
const oneOpen = (arr, id) => {
	return arr.map(item => {
		if (item.id === id) {
			return { ...item, isOpen: true };
		}

		return item;
	});
}