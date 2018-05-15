/* @flow */
import Grid, { GridItem } from '../../../../../library/Grid';
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'title',
  title: 'Title',
  description: `Display a title for your Table with the \`title\` prop. You
  can adjust the appearance (\`titleAppearance\`) and the rendered HTML element
  (\`titleElement\`).`,
  scope: { Table, Grid, GridItem, sharedData },
  source: `
    <Grid alignItems="end" breakpoints={['57em']}>
      <GridItem span={[12, 6]} marginBottom={['lg', 0]}>
        <Table
          title="Delicious Foods"
          data={sharedData}
          rowKey="Fruits"/>
      </GridItem>
      <GridItem span={[12, 6]}>
        <Table
          title="Delicious Foods"
          titleAppearance="h2"
          titleElement="h3"
          data={sharedData}
          rowKey="Fruits"/>
      </GridItem>
    </Grid>`
};
