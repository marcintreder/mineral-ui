/* @flow */
import React, { Component } from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /** TODO */
  currentPage: number
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
  // const { direction } = theme;
  // const rtl = direction === 'rtl';

  return {
    // display: 'flex'
  };
};

const Root = createStyledComponent('div', styles, {
  includeStyleReset: true
});

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    currentPage: 0
  };

  state = {
    currentPage: this.props.currentPage
  };

  render() {
    const { ...restProps } = this.props;
    const rootProps = {
      ...restProps
    };

    return <Root {...rootProps} />;
  }
}
