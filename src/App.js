import React, { useState } from 'react';

import { WrapperCards } from './components/wrapper-cards';
import './App.css';


function App() {
	const [isFinish, setFinish] = useState(true);

	return (
		<div className="App">
			{isFinish ? (
				<div className="winner">
					<div className="winner-title">Победа</div>
					<div className="winner-button" onClick={() => setFinish(false)}>Начать заново</div>
				</div>
				) : <WrapperCards cardsData={randomArray()} finish={setFinish}/>
			}
		</div>
	);
}

export default App;

const randomArray = () => {
	const num = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];

	return Array.from({ length: 16 }, (_i, id) => {
		const index = Math.floor(Math.random() * num.length);
		const image = num[index];
		num.splice(index, 1);
		console.log(num[index], 66, id)

		return {
			id: id,
			image: image,
			isOpen: true,
			isSelect: false}
	})
}
