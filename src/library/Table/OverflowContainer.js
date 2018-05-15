/* @flow */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import EventListener from '../EventListener';
import { createStyledComponent } from '../styles';

type Props = {
  children: React$Node
};

type State = {
  scrollable: boolean
};

const Root = createStyledComponent('div', {
  overflowX: 'auto',

  '&:focus': {
    outline: 0
  }
});

/**
 * OverflowContainer
 */
export default class OverflowContainer extends Component<Props, State> {
  state = {
    scrollable: false
  };

  container: ?HTMLElement;

  componentDidMount() {
    this.updateScrollable();
  }

  componentDidUpdate() {
    this.updateScrollable();
  }

  setContainerRef = (node: HTMLElement) => {
    this.container = node;
  };

  updateScrollable = () => {
    const node = this.container;
    const scrollable = Boolean(node && node.scrollWidth > node.clientWidth);
    if (this.state.scrollable !== scrollable) {
      this.setState({
        scrollable
      });
    }
  };

  handleWindowResize = debounce(this.updateScrollable, 500);

  render() {
    const { children, ...restProps } = this.props;

    const rootProps = {
      innerRef: this.setContainerRef,
      ...(this.state.scrollable ? { tabIndex: 0 } : undefined),
      ...restProps
    };
    return (
      <Root {...rootProps}>
        {children}
        <EventListener
          listeners={[
            {
              target: 'window',
              event: 'resize',
              handler: this.handleWindowResize
            }
          ]}
        />
      </Root>
    );
  }
}
