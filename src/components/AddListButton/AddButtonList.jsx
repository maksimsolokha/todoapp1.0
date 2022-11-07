import React from 'react'
import List from '../List/List'
import './AddButtonLst.scss'
import { useState, useEffect } from 'react'
import { Badge } from '../Badge/Badge'
import closeBtn from '../../assets/icons/close.svg'
import axios from 'axios'

const AddButtonList = ({ colors, onAdd }) => {
	const [visible, setVisible] = useState(false)
	const [selectColor, setColor] = useState(3)
	const [isLoading, setIsLoading] = useState(false)
	const [inputValue, setInputValue] = useState('')
	useEffect(() => {
		if (Array.isArray(colors)) {
			setColor(colors[0].id)
		}
	}, [colors])

	const onClose = () => {
		setVisible(false)
		setInputValue('')
		setColor(colors[0].id)
	}
	const addList = () => {
		if (!inputValue) {
			alert('Enter a name for the list')
			return
		}
		setIsLoading(true)
		axios
			.post('http://localhost:3001/lists', {
				name: inputValue,
				colorId: selectColor,
			})
			.then(({ data }) => {
				const color = colors.filter(c => c.id === selectColor)[0].name
				const listObj = { ...data, color: { name: color } }
				onAdd(listObj)
				onClose()
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<div className='add_list'>
			<List
				onClick={() => {
					setVisible(true)
				}}
				items={[
					{
						className: 'list__add-button',
						icon: (
							<svg
								width='11'
								height='11'
								viewBox='0 0 12 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6 1V11'
									stroke='#868686'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1 6H11'
									stroke='#868686'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						),
						name: 'Add List',
					},
				]}
			/>
			{visible && (
				<div className='add_list__popup'>
					<img
						onClick={onClose}
						src={closeBtn}
						alt='Close'
						className='add_list__popup-close'
					/>
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className='field'
						type='text'
						placeholder='List name '
					/>
					<div className='add_list__popup-colors '>
						{colors.map(color => (
							<Badge
								key={color.id}
								color={color.name}
								onClick={() => setColor(color.id)}
								className={selectColor === color.id && 'active'}
							/>
						))}
					</div>
					<button onClick={addList} className='button'>
						{isLoading ? 'Добавление...' : 'Добавить'}
					</button>
				</div>
			)}
		</div>
	)
}
export default AddButtonList
