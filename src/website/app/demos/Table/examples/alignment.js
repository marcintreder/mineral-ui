/* @flow */
import Table from '../../../../../library/Table';
import data from '../shared/data';

export default {
  id: 'alignment',
  title: 'Alignment',
  hideFromProd: true,
  hideSource: true,
  scope: { Table, data },
  source: `
    () => {
      const columns = [
        { content: 'Fruits', key: 'Fruits' },
        { content: 'Vegetables Vegetables Vegetables Vegetables', key: 'Vegetables', textAlign: 'end' },
        { content: 'Grains Grains Grains Grains', key: 'Grains', textAlign: 'center' },
        { content: 'Dairy', key: 'Dairy',  textAlign: 'justify' }
      ];

      const wrappingData = [
        data[0],
        {
          Fruits: 'Starfruit Starfruit Starfruit Starfruit',
          Vegetables: 'Romanesco',
          Grains: 'Sorghum',
          Dairy: 'Casu marzu Casu marzu Casu marzu Casu marzu',
          Protein: 'Barnacles'
        },
        data[2],
        data[3]
      ];

      return (
        <Table
          columns={columns}
          data={wrappingData}
          sortable
          defaultSort={{ key: 'Vegetables' }}
          title="Foods of the World"
          hideTitle />
      );
    }`
};
