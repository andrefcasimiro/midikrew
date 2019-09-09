// @flow
import { withStateHandlers, type Component } from 'recompose'

type Added = {|
  isOpen: boolean,
  toggleOpen: void => mixed,
  open: void => mixed,
  close: void => mixed,
|}

function withOpen<T>(
  WrappedComponent: Component<{ ...$Exact<T>, ...$Exact<Added> }>,
): Component<T> {
  return withStateHandlers(
    {
      isOpen: false,
    },
    {
      toggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen }),
      close: () => () => ({ isOpen: false }),
      open: () => () => ({ isOpen: true }),
    },
  )(WrappedComponent)
}

export default withOpen
