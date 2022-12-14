import React, { useState, useEffect } from 'react'
import List from './components/List/List'
import list_icon from './assets/icons/list_icon.svg'
import AddButtonList from './components/AddListButton/AddButtonList'
import { Tasks } from './components/Tasks/Tasks'
import axios from 'axios'

function App() {
	const [lists, setLists] = useState(null)
	const [colors, setColors] = useState(null)

	useEffect(() => {
		axios
			.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
			.then(({ data }) => {
				setLists(data)
			})
		axios.get('http://localhost:3001/colors').then(({ data }) => {
			setColors(data)
		})
	}, [])

	const onAddList = obj => {
		const newList = [...lists, obj]
		setLists(newList)
	}

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List
					items={[
						{
							icon: <img src={list_icon} alt='Menu Icon'></img>,
							name: 'All Tasks',
						},
					]}
				/>
				{lists ? (
					<List
						items={lists}
						onRemove={id => {
							const newLists = lists.filter(item => item.id !== id)
							setLists(newLists)
						}}
						isRemoved
					/>
				) : (
					'Загрузка...'
				)}
				<AddButtonList onAdd={onAddList} colors={colors} />
			</div>
			<div className='todo__tasks'>{lists && <Tasks list={lists[1]} />}</div>
		</div>
	)
}

export default App
