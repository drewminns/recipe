import React from 'react'
import { Link } from 'react-router-dom'

type CardProps = {
  image: string
  title: string
  link: string
  copy?: string
}

export const Card: React.FC<CardProps> = ({ image, title, copy, link = '/' }: CardProps) => {
  return (
    <div>
      <Link to={link}>
        <img src={image} alt={title} />
        <p>{title}</p>
        {copy && <p>{copy}</p>}
      </Link>
    </div>
  )
}

Card.displayName = 'Card'
