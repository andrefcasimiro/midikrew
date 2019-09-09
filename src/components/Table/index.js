// @flow
import React from 'react'
import type { Component as TypeComponent } from 'recompose'
import { Margin } from 'componentsStyled/Layout'
import { Subtitle } from 'componentsStyled/Typography'
import { BoxSection, TitleSection } from 'componentsStyled/Shared'
import { Button } from 'componentsStyled/Buttons'
import { ComponentWrapper } from './styled'

type Props = {
  data: Array<*>,
  selector: any,
  component: TypeComponent<*, *>,
  title: string,
  transform?: Function,
}

const Table = ({ data, selector, component: Component, title, transform }: Props) => {
  const _data = typeof data === 'object' ? Object.values(data[selector]) : data[selector]

  const table = transform
    ? transform(_data)
    : _data

  return (
    <Margin>
      {title &&
        <TitleSection>
          <Button><Subtitle>{title}</Subtitle></Button>
        </TitleSection>
      }
      <BoxSection>
        {table.map((entry, index) =>
          <ComponentWrapper key={index}>
            <Component data={entry} type={selector} />
          </ComponentWrapper>
        )}
      </BoxSection>
    </Margin>
  )
}

export default Table
