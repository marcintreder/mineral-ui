/* @flow */
import React, { Component, Fragment } from 'react';
import { IconChevronRight } from 'mineral-ui-icons';
import { IconChevronLeft } from 'mineral-ui-icons';
import { createStyledComponent } from '../styles';
import { createThemedComponent } from '../themes';
import Button from '../Button';
import EventListener from '../EventListener';
// import Flex, { FlexItem } from '../Flex';
import { FormField } from '../Form';
import TextInput from '../TextInput';

type Props = {
  /** TODO */
  'aria-label'?: string,
  /** TODO */
  defaultPage?: number,
  /** TODO */
  pageSize?: number,
  /** TODO */
  pageJumper?: boolean,
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

const pages = (currentPage, handleClick, { totalPages, visibleRange }) => {
  const pagesBufferMiddle = Math.ceil(
    (visibleRange || Pagination.defaultProps.visibleRange) / 2
  );
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

const createPageJumper = (handleFormFieldKeydown) => (
  // <FlexItem display="inline-flex">
  <Fragment>
    <EventListener
      listeners={[
        {
          target: 'input',
          event: 'keydown',
          handler: handleFormFieldKeydown,
          options: true
        }
      ]}
    />
    <FormField
      label="Jump to page"
      hideLabel
      input={TextInput}
      caption="Jump to page"
      placeholder="Page #"
    />
  </Fragment>
  // </FlexItem>
);

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    'aria-label': 'Pagination',
    defaultPage: 0,
    pageSize: 10,
    visibleRange: 3
  };

  state = {
    currentPage:
      (this.props.defaultPage && this.props.defaultPage - 1) ||
      Pagination.defaultProps.defaultPage
  };

  render() {
    const { pageJumper, totalPages, ...restProps } = this.props;
    const rootProps = {
      ...restProps
    };

    return (
      <Root {...rootProps}>
        {/* <Flex> */}
        {pageJumper ? createPageJumper(this.handleFormFieldKeydown) : null}
        {/* <FlexItem> */}
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
        {/* </FlexItem> */}
        {/* </Flex> */}
      </Root>
    );
  }

  handleClick = (index: number) => {
    this.setState({ currentPage: index });
  };
  handleIncrement = (incrementForward: boolean) =>
    this.setState((prevState) => ({
      currentPage: incrementForward
        ? prevState.currentPage + 1
        : prevState.currentPage - 1
    }));

  handleFormFieldKeydown = (event: SyntheticInputEvent<>) => {
    const value = parseInt(event.target.value);
    if (event.key === 'Enter' && 1 < value && value < this.props.totalPages) {
      this.setState({ currentPage: value - 1 });
    }
  };
}
