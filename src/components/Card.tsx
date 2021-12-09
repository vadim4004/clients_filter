import React, { useState } from 'react';
import styles from './Card.module.css';

interface ICard {
	firstName: string;
	lastName: string;
	patronymic: string;
	statusText: string;
	statusArr: IStatus[];
}

interface IStatus {
	code: number;
	statusText: string;
}

export const Card: React.FC<ICard> = ({
	firstName,
	lastName,
	patronymic,
	statusText,
	statusArr,
}) => {
	const [currentStatus, setCurrentStatus] = useState<string>(statusText);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentStatus(e.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.info}>
				<p>{lastName}</p>
				<p>
					{firstName} {patronymic}
				</p>
				{isEditable ? (
					<select
						onChange={handleChange}
						name='select'
						id='select'
						value={currentStatus}
					>
						{statusArr?.map((item) => (
							<option key={item.statusText} value={item.statusText}>
								{item.statusText}
							</option>
						))}
					</select>
				) : (
					<p>{currentStatus}</p>
				)}
				<button type='button' onClick={() => setIsEditable(!isEditable)}>
					{isEditable ? 'Подтвердить' : 'Изменить статус'}
				</button>
			</div>
		</div>
	);
};
