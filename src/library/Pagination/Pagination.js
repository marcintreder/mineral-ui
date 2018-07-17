/* @flow */
import React, { Component } from 'react';
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

const styles = ({ theme: baseTheme }) => {
  let theme = componentTheme(baseTheme);

  return {
    '& button': {
      '&:not(:last-child)': {
        marginRight: theme.space_inline_sm
      }
    }
  };
};

const Root = createStyledComponent('nav', styles, {
  includeStyleReset: true
});

const PageButton = createThemedComponent(Button, {
  Button_paddingHorizontal: 0
});

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
    const pages = Array.apply(null, Array(totalPages))
      .map(Number.prototype.valueOf, 0)
      .map((_, index) => <PageButton key={index}>{index + 1}</PageButton>);

    return <Root {...rootProps}>{pages}</Root>;
  }
}
