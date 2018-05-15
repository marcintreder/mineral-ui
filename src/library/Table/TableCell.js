/* @flow */
import React, { PureComponent } from 'react';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import { rtlTextAlign } from '../utils';
import { TableContext } from './TablePresentational';

type Props = {
  /** Rendered content */
  children?: React$Node,
  /** @Private Rendered element */
  element?: string,
  /** Remove padding */
  noPadding?: boolean,
  /** See DataTable's Column type */
  primary?: boolean,
  /** See DataTable's Column type */
  textAlign?: 'start' | 'end' | 'center' | 'justify',
  /** See DataTable */
  verticalSpace: 'default' | 'spacious'
};

export const componentTheme = (baseTheme: Object) => ({
  TableCell_fontSize: baseTheme.fontSize_ui,
  TableCell_paddingHorizontal: baseTheme.space_inline_md,
  TableCell_paddingVertical: baseTheme.space_stack_sm,
  TableCell_paddingVertical_spacious: pxToEm(12),
  TableCell_verticalAlign: 'top',

  ...baseTheme
});

const styles = ({ noPadding, textAlign, theme: baseTheme, verticalSpace }) => {
  const theme = componentTheme(baseTheme);
  const fontSize = theme.TableCell_fontSize;
  const paddingHorizontal = getNormalizedValue(
    theme.TableCell_paddingHorizontal,
    fontSize
  );
  const paddingVertical = getNormalizedValue(
    verticalSpace === 'spacious'
      ? theme.TableCell_paddingVertical_spacious
      : theme.TableCell_paddingVertical,
    fontSize
  );

  return {
    fontSize,
    fontWeight: 'inherit',
    padding: noPadding ? 0 : `${paddingVertical} ${paddingHorizontal}`,
    textAlign: rtlTextAlign(textAlign, theme.direction) || 'inherit',
    verticalAlign: theme.TableCell_verticalAlign
  };
};

// TableCell's root node must be created outside of render, so that the entire DOM
// element is replaced only when the element prop is changed, otherwise it is
// updated in place
function createRootNode(props: Props) {
  const defaultElement = TableCell.defaultProps.element;
  const element =
    props.element && props.element !== defaultElement
      ? props.element
      : props.primary ? 'th' : defaultElement;

  return createStyledComponent(element, styles, {
    displayName: 'TableCell',
    rootEl: element
  });
}

/**
 * TableCell
 */
export default class TableCell extends PureComponent<Props> {
  static defaultProps = {
    element: 'td'
  };

  componentWillUpdate(nextProps: Props) {
    if (
      this.props.element !== nextProps.element ||
      this.props.primary !== nextProps.primary
    ) {
      this.rootNode = createRootNode(nextProps);
    }
  }

  rootNode: React$ComponentType<*> = createRootNode(this.props);

  render() {
    console.log('render TableCell', this.props.children);
    const { children, primary, ...restProps } = this.props;

    const Root = this.rootNode;

    return (
      <TableContext.Consumer>
        {({ verticalSpace }) => {
          const rootProps = {
            scope: primary ? 'row' : undefined,
            verticalSpace,
            ...restProps
          };
          return <Root {...rootProps}>{children}</Root>;
        }}
      </TableContext.Consumer>
    );
  }
}
