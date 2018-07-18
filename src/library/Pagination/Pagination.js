/* @flow */
import React, { Component } from 'react';
import { IconChevronRight } from 'mineral-ui-icons';
import { IconChevronLeft } from 'mineral-ui-icons';
import { createStyledComponent } from '../styles';
import { createThemedComponent } from '../themes';
import Button from '../Button';

type Props = {
  /** TODO */
  'aria-label': string,
  /** TODO */
  currentPage?: number,
  /** TODO */
  rowsPerPage?: number,
  /** TODO */
  visibleRange?: number,
  /** TODO */
  totalPages: number
};

type State = {
  currentPage: number
};

export const componentTheme = (baseTheme: Object) => ({
  // Pagination_color_checkedDisabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = {
  root: ({ theme: baseTheme }) => {
    let theme = componentTheme(baseTheme);

    return {
      display: 'flex',
      justifyContent: 'flex-end',

      '& button': {
        '&:not(:last-child)': {
          marginRight: theme.space_inline_sm
        }
      }
    };
  },
  icon: {}
};

// const findStartIcon = (rtl) => (rtl ? IconChevronRight : IconChevronLeft);
// const findEndIcon = (rtl) => (rtl ? IconChevronLeft : IconChevronRight);
const previousButton = (
  <Button aria-label="Chevron-left" iconStart={<IconChevronLeft />} minimal />
);
const nextButton = (
  <Button aria-label="Chevron-left" iconStart={<IconChevronRight />} minimal />
);

const Root = createStyledComponent('nav', styles.root, {
  includeStyleReset: true
});

const PageButton = createThemedComponent(Button, {
  Button_paddingHorizontal: 0
});

const pages = (totalPages) =>
  Array.apply(null, Array(totalPages))
    .map(Number.prototype.valueOf, 0)
    .map((_, index) => (
      <PageButton minimal key={index}>
        {index + 1}
      </PageButton>
    ));

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    currentPage: 0,
    rowsPerPage: 10,
    visibleRange: 5
  };

  state = {
    currentPage: this.props.currentPage || Pagination.defaultProps.currentPage
  };

  render() {
    const { totalPages, ...restProps } = this.props;
    const rootProps = {
      ...restProps
    };

    return (
      <Root {...rootProps}>
        {previousButton}
        {pages(totalPages)}
        {nextButton}
      </Root>
    );
  }
}
