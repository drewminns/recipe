import React from 'react'
import styled from 'styled-components'

import { theme } from '../GlobalStyles'

export const Loading: React.FC<{}> = () => {
  return (
    <LoadingWrapper>
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingText = styled.p`
  color: ${theme.color.gray};
  font-family: ${theme.font.sans};
  text-transform: uppercase;
`

Loading.displayName = 'Loading'
