import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { theme } from '../GlobalStyles'

type ErrorProps = {
  message: string
  canGoBack?: boolean
}

export const Error: React.FC<ErrorProps> = ({ message, canGoBack = false }: ErrorProps) => {
  const history = useHistory()

  return (
    <ErrorWrapper>
      <div>
        <ErrorText>Error Loading {message}</ErrorText>
        {canGoBack && <ErrorButton onClick={() => history.goBack()}>Go Back</ErrorButton>}
      </div>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const ErrorText = styled.p`
  color: ${theme.color.gray};
  font-family: ${theme.font.sans};
  text-transform: uppercase;
  font-size: ${theme.font.sizes.xl};
`

const ErrorButton = styled.button`
  appearance: none;
  background: ${theme.color.indigo};
  color: ${theme.color.white};
  border: 0;
  padding: 1rem 1.5rem;
  font-size: ${theme.font.sizes.lg};
`

Error.displayName = 'Error'
