// @flow
import React from 'react'
import {
  Field,
  Text,
} from 'componentsStyled/Typography'
import { Wrapper, Content } from './styled'
import type { Movie as TypeMovie } from 'data/movies/types'

type Props = {
  data: TypeMovie,
}

const Movie = ({ data }: Props) => {
  return (
    <React.Fragment>
      <Wrapper background={data.posters && data.posters[0]}>
        <Content>
          <Field>{data.title}</Field>
          <Text>({data.year})</Text>
        </Content>
      </Wrapper>
    </React.Fragment>
  )
}

export default Movie
