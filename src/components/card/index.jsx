import React from 'react';
import classNames from 'classnames'; 

import './style.css';

export const Card = ({ id, image, isOpen, isSelect, handleClick }) => {
	// Обработка нажатия на карточку
	const onClick = () => {
		if (!isSelect && !isOpen) {
			handleClick({id, image})
		}
	}
// Возврат размметки для отображения карточки
	return (
		<div className={classNames('card', { 'card--is-open': isOpen })} onClick={onClick}>
			<div className={'empty'} />
			<div className={'image'}>{image}</div>
		</div>
	)
}
