// @flow
import React, { Component } from 'react'
import { database } from 'global/firebase'
import Table from 'components/Table'
import Movie from 'components/Movie'
import { Margin } from 'componentsStyled/Layout'
import {
  filterByProp,
  filterByValue,
} from 'data/movies/helpers'

type S = {
  data: Array<*>,
  loading: boolean,
  key: string,
}

class Movies<P: *> extends Component <P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      data: [],
      loading: true,
      key: 'movies',
    }
  }

  componentDidMount() {
    // Create connection
    database.ref().on('value', snapshot => {
      const data = snapshot.val()

      if (data) {
        return this.setState({
          data,
          loading: false,
        })
      }
      return this.setState({
        loading: true,
      })
    })
  }

  render() {
    const { data, loading } = this.state

    return (
      <React.Fragment>
        {loading
          ? <p>Loading...</p>
          : <Margin>
              <Table data={data} selector='movies' component={Movie} title='Awarded Movies' transform={filterByProp('awards')} />
              <Table data={data} selector='movies' component={Movie} title='Adventure Movies' transform={filterByValue('genre', 'adventure')} />
              <Table data={data} selector='movies' component={Movie} title='Biopic Movies' transform={filterByValue('genre', 'biopic')} />
              <Table data={data} selector='movies' component={Movie} title='Comedy Movies' transform={filterByValue('genre', 'comedy')} />
            </Margin>
        }
      </React.Fragment>
    )
  }
}

export default Movies
