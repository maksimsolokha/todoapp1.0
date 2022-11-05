import React from 'react'
import './list.scss'

export default function List({ items }) {
	return (
		<div>
			<ul className='list'>
				{items.map(item => (
					<li>
						<i>
							{item.icon ? (
								item.icon
							) : (
								<i className={`badge badge--${item.color}`}></i>
							)}
						</i>
						<span>{item.name}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
