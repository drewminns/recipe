import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from '../GlobalStyles'

type CardProps = {
  image: string
  title: string
  link: string
}

export const Card: React.FC<CardProps> = ({ image, title, link = '/' }: CardProps) => {
  const match = useRouteMatch({
    path: link,
  })

  return (
    <CardWrapper isActive={match?.path === link}>
      <Link to={link}>
        <CardLayout>
          <CardImage src={image} alt={title} loading="lazy" width="80px" />
          <CardTitle>{title}</CardTitle>
        </CardLayout>
      </Link>
    </CardWrapper>
  )
}

Card.displayName = 'Card'

interface ICardWrapperProps {
  isActive: boolean
}

const CardWrapper = styled.div<ICardWrapperProps>`
  margin-bottom: 1.4rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: ${theme.color.white};
  border-radius: 0 1rem 1rem 0;

  a {
    text-decoration: none;
    color: ${theme.color.dark};
    display: block;
    padding: 1.5rem 1rem;
    border: 1px solid transparent;
    border-left: 5px solid ${props => (props.isActive ? theme.color.indigo : 'transparent')};

    &:focus,
    &:hover {
      outline: none;
      border: 1px solid ${theme.color.indigo};
      padding-left: ${props => (props.isActive ? '1rem' : '1.4rem')};
      border-left: ${props => (props.isActive ? `5px solid ${theme.color.indigo}` : `1px solid ${theme.color.indigo}`)};
    }
  }
`
const CardLayout = styled.div`
  display: flex;
  align-items: center;
`

const CardImage = styled.img`
  width: 60px;
  border-radius: 50%;
`

const CardTitle = styled.h3`
  font-weight: ${theme.font.regular};
  font-family: ${theme.font.sans};
  font-size: ${theme.font.sizes.lg};
  margin: 0 0 0 1rem;
  letter-spacing: -0.03em;
`
