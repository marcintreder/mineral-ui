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
  pageSize?: number,
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

const firstPage = (current) => current === 0;
const lastPage = (current, total) => current === total - 1;

const incrementButton = (
  currentPage,
  direction,
  handleIncrement,
  totalPages
) => {
  const incrementForward = direction === 'next' ? true : false;
  const incrementIcon =
    direction === 'next' ? <IconChevronRight /> : <IconChevronLeft />;
  const disabled =
    direction === 'next'
      ? lastPage(currentPage, totalPages)
      : firstPage(currentPage);
  return (
    <Button
      aria-label={`${direction}-pointing chevron`}
      disabled={disabled}
      iconStart={incrementIcon}
      minimal
      onClick={handleIncrement.bind(null, incrementForward)}
    />
  );
};

const Root = createStyledComponent('nav', styles.root, {
  includeStyleReset: true
});

const PageButton = createThemedComponent(Button, {
  Button_paddingHorizontal: 0
});

// const createPageRange = () => {
//
// }

const pages = (currentPage, handleClick, { totalPages, visibleRange }) => {
  // const displayPages = totalPages > visibleRange ? [totalPages[currentPage]] : totalPages
  const pagesBufferMiddle = Math.ceil(visibleRange / 2);
  const pagesBuffer =
    currentPage === 0 || currentPage === totalPages - 1
      ? pagesBufferMiddle + 1
      : pagesBufferMiddle;
  return Array.apply(null, Array(totalPages))
    .map(Number.prototype.valueOf, 0)
    .map((_, index) => {
      let primary = false;
      if (currentPage === index) {
        primary = true;
      }
      const firstPageInRange =
        index === currentPage - pagesBuffer && !firstPage(index);
      const lastPageInRange =
        index === currentPage + pagesBuffer && !lastPage(index, totalPages);
      const isPageOutOfRange =
        index < currentPage - pagesBuffer || index > currentPage + pagesBuffer;

      let pageView = null;
      if (firstPageInRange || lastPageInRange) {
        pageView = (
          <Button element="span" key={index} minimal>
            ...
          </Button>
        );
      } else if (
        !isPageOutOfRange ||
        firstPage(index) ||
        lastPage(index, totalPages)
      ) {
        pageView = (
          <PageButton
            minimal
            primary={primary}
            key={index}
            onClick={handleClick.bind(null, index)}>
            {index + 1}
          </PageButton>
        );
      }
      return pageView;
    })
    .filter((page) => !!page);
};

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    currentPage: 0,
    pageSize: 10,
    visibleRange: 3
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
        {incrementButton(
          this.state.currentPage,
          'previous',
          this.handleIncrement,
          totalPages
        )}
        {pages(this.state.currentPage, this.handleClick, this.props)}
        {incrementButton(
          this.state.currentPage,
          'next',
          this.handleIncrement,
          totalPages
        )}
      </Root>
    );
  }

  handleClick = (index) => {
    this.setState({ currentPage: index });
  };
  handleIncrement = (incrementForward) => {
    if (incrementForward) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1
      }));
    } else {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1
      }));
    }
  };
}
