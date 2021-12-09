import users from './local-json/list.json';
import status from './local-json/status.json';
import { Card } from './components/Card';
import styles from './App.module.css';
import React, { useEffect, useState } from 'react';

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	statusCode: number;
	statusText: string;
}

function App() {
	const [usersData, setUsersData] = useState<IUser[]>([]);
	const [search, setSearch] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const statusArr = status.status;

	useEffect(() => {
		const res: IUser[] = [];
		Object.entries(users.list).forEach((item) => {
			const newData = {
				id: item[0],
				firstName: item[1].firstName,
				lastName: item[1].lastName,
				patronymic: item[1].patronymic,
				statusCode: item[1].status,
				statusText: '',
			};

			statusArr.forEach((item) => {
				if (newData.statusCode === item.code)
					newData.statusText = item.statusText;
			});

			res.push(newData);
		});
		setUsersData(res);
	}, [statusArr]);

	const filteredUsers = !search
		? usersData
		: usersData.filter(
				(user) =>
					user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
					user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
					user.patronymic?.toLowerCase().includes(search.toLowerCase()) ||
					(
						user.firstName?.toLowerCase() +
						' ' +
						user.lastName?.toLowerCase() +
						' ' +
						user.patronymic?.toLowerCase()
					).includes(search.toLowerCase())
		  );

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<label htmlFor='search'>Поиск</label>
				<input
					type='text'
					id='search'
					value={search}
					onChange={handleChange}
					placeholder='Введите имя'
				/>
			</div>
			<div className={styles.content}>
				{filteredUsers?.map((user) => (
					<Card key={user.id} {...user} statusArr={statusArr} />
				))}
			</div>
		</div>
	);
}

export default App;
