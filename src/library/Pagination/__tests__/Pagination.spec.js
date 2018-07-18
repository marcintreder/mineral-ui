/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../Pagination';
import examples from '../../../website/app/demos/Pagination/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

const defaultProps = {
  totalPages: 10,
  onChange: jest.fn(),
  onClick: jest.fn()
};

function shallowPagination(props = {}) {
  const paginationProps = {
    ...defaultProps,
    ...props
  };
  return shallow(<Pagination {...paginationProps} />);
}

describe('Pagination', () => {
  testDemoExamples(examples);

  it('renders', () => {
    const pagination = shallowPagination();

    expect(pagination.exists()).toEqual(true);
  });
});
