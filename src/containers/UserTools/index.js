// @flow
import React, { Component } from 'react'
import { Button } from 'componentsStyled/Buttons'
import ModalButton from 'components/ModalButton'
import AddForm from 'modals/AddForm'
import {
  addMovie,
} from 'data/movies/forms'
import { StyledBoxSection as BoxSection } from './styled'
import {
  FaEdit as AddMovieIcon,
} from 'react-icons/fa'

type S = {}

class UserTools<P: *> extends Component <P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
    }
  }

  render() {

    return (
      <React.Fragment>
        <BoxSection>
          <ModalButton
            modalComponent={AddForm}
            modalProps={{ form: addMovie, }}
            modalTitle="Add a movie"
          >
            <AddMovieIcon /> Add movie
          </ModalButton>
          <Button>Notifications</Button>
          <Button>Account</Button>
          <Button>Log out</Button>
        </BoxSection>
      </React.Fragment>
    )
  }
}

export default UserTools
