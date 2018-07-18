/* @flow */
import Pagination from '../../../../../library/Pagination';

export default {
  id: 'default-page',
  title: 'Default Page',
  description: `TODO`,
  scope: { Pagination },
  source: `
    <Pagination defaultPage={5} totalPages={10} />
  `
};
