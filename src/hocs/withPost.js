// @flow
import { database } from 'global/firebase'
import { compose, withProps, type Component } from 'recompose'

export type Endpoint = 'movies'

type Added = {
  submit: Function,
}

function withPost<Props>(
  endpointKey: Endpoint,
): Component<Props, Added> {
  return compose(
    withProps(props => {
      const db = endpointKey && database.ref().child(endpointKey)

      return {
        submit: values => Promise.resolve(db.push(values)).then(result => console.log('result: ', result))
      }
    })
  )
}

export default withPost
