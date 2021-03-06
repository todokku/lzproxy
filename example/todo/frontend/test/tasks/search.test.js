import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import td from 'testdouble'

import Search from '../../src/tasks/search'
import TASK_STORE from '../../src/tasks/task_store'

describe('Search', function() {
  let taskStoreSearch
  beforeEach(function() {
    taskStoreSearch = td.replace(TASK_STORE, 'search')
  })
  afterEach(function() {
    return td.reset()
  })

  afterEach(cleanup)

  it('sets search query', function() {
    const { getByLabelText, getByText } = render(<Search />)
    fireEvent.change(getByLabelText(/search for/i), {
      target: { value: 'foo' }
    })
    fireEvent.click(getByText('Search', { selector: 'button' }))
    td.verify(taskStoreSearch('foo'))
  })
})
