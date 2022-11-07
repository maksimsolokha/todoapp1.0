import React from 'react'
import classNames from 'classnames'
import './list.scss'
import { Badge } from '../Badge/Badge'
import removeSvg from '../../assets/icons/remove.svg'
import axios from 'axios'

export default function List({ items, onClick, isRemoved, onRemove }) {
	const removeList = item => {
		if (window.confirm('Are you sure?')) {
			axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
				onRemove(item.id)
			})
		}
	}

	return (
		<div>
			<ul onClick={onClick} className='list'>
				{items.map((item, index) => (
					<li
						key={index}
						className={classNames(item.className, { active: item.active })}
					>
						<i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
						<span>{item.name}</span>
						{isRemoved && (
							<img
								onClick={() => removeList(item)}
								className='list__remove-icon'
								src={removeSvg}
								alt='Remove'
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
