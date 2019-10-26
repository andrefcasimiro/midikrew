// @flow
import React from 'react'
import { compose, type HOC, withHandlers, } from 'recompose'
import { extractInstrumentFromPack, loader } from 'data/packs/helpers'
import type { Instrument } from 'data/instrument/types'
import { Field, Text } from 'componentsStyled/Typography'
import { PaddedIconButton, FullIconButton } from 'componentsStyled/Buttons'
import { PaddedColumn, PaddedContainer } from 'componentsStyled/Layout'
import { StyledLi } from './styled'

type Props = {
  close: Function,
  pack: Instrument[],
  credits: {
    name: string,
    source: string,
  }
}

const getFormat = (str: string) => {
  const splitted = str.split('.')
  const media = splitted[splitted.length - 1]

  return media.toLowerCase()
}

const Pack = ({ close, credits, pack, handleInstrumentExtraction }) => (
  <>
    <ul>
      <PaddedContainer>
        <Text>Samples downloaded from &nbsp; <a href={credits.source} rel='noopener noreferrer' target='_blank' >{credits.name}</a></Text>
      </PaddedContainer>
      <hr />
      <br />
      {pack.map((instrument, index) =>
        <StyledLi key={instrument.id}>
          <PaddedColumn>
            <Field>{instrument.name}</Field>
            <PaddedIconButton onClick={() => handleInstrumentExtraction(instrument.id)}>Add Instrument</PaddedIconButton>
          </PaddedColumn>
          <audio controls>
            <source src={instrument.samplePath} type={`audio/${getFormat(instrument.samplePath)}`}/>
          </audio>
        </StyledLi>
      )}
      <FullIconButton onClick={() => loader(pack)}>Add all</FullIconButton>
    </ul>
  </>
)

const enhancer: HOC<*, Props> = compose(
  withHandlers({
    handleInstrumentExtraction: props => id => {
      const instrument = extractInstrumentFromPack(id, props.pack)

      if (!instrument) {
        return
      }

      return loader(instrument)
    }
  })
)

export default enhancer(Pack)
