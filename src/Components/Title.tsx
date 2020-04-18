import React from 'react'
import styled from 'styled-components'

import { theme } from '../GlobalStyles'

type TitleProps = {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return (
    <TitleContainer>
      <h2>{title}</h2>
    </TitleContainer>
  )
}

Title.displayName = 'Title'

const TitleContainer = styled.header`
  padding: 1rem 2rem;
  background-color: ${theme.color.white};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-bottom: 4px solid ${theme.color.indigo};

  h2 {
    font-family: ${theme.font.sans};
    margin: 1rem 0;
    font-size: 1.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`
