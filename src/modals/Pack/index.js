// @flow
import React from 'react'
import { compose, type HOC, withHandlers, } from 'recompose'
import { extractInstrumentFromPack, loader } from 'data/packs/helpers'
import type { Instrument } from 'data/instrument/types'
import { Field } from 'componentsStyled/Typography'
import { PaddedIconButton, FullIconButton } from 'componentsStyled/Buttons'
import { PaddedColumn } from 'componentsStyled/Layout'
import { StyledLi } from './styled'

type Props = {
  close: Function,
  pack: Instrument[],
}

const getFormat = (str: string) => {
  const splitted = str.split('.')
  const media = splitted[splitted.length - 1]

  return media.toLowerCase()
}

const Pack = ({ close, pack, handleInstrumentExtraction }) => {


  return (
    <>
      <ul>
        {pack.map((instrument, index) =>
          <StyledLi key={instrument.id} onClick={() => handleInstrumentExtraction(instrument.name)}>
            <PaddedColumn>
              <Field>{instrument.name}</Field>
              <PaddedIconButton>Add Instrument</PaddedIconButton>
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
}

const enhancer: HOC<*, Props> = compose(
  withHandlers({
    handleInstrumentExtraction: props => name => {
      const instrument = extractInstrumentFromPack(name, props.pack)

      if (!instrument) {
        return
      }

      return loader(instrument)
    }
  })
)

export default enhancer(Pack)
