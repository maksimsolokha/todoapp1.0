import React from 'react'
import List from './components/List/List'
import list_icon from './assets/icons/list_icon.svg'

function App() {
	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List
					items={[
						{
							icon: <img src={list_icon} alt='Menu Icon'></img>,
							name: 'Shopping',
						},
					]}
				/>
				<List
					items={[
						{
							name: 'Food',
							color: 'red',
						},
						{
							name: 'Lessons',
							color: 'blue',
						},
						{
							name: 'Nazar',
							color: 'pink',
						},
					]}
				/>
			</div>

			<div className='todo_tasks'></div>
		</div>
	)
}

export default App
