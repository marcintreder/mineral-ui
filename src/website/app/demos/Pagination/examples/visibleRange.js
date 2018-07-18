/* @flow */
import Pagination from '../../../../../library/Pagination';

export default {
  id: 'visible-range',
  title: 'Visible Range',
  description: `TODO`,
  scope: { Pagination },
  source: `
    <Pagination visibleRange={5} totalPages={10}/>
  `
};
