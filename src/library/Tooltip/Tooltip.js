/* @flow */
import React, { Children, cloneElement, Component } from 'react';
import { createStyledComponent } from '../styles';
import { createThemedComponent, mapComponentThemes } from '../themes';
import { composeEventHandlers, generateId } from '../utils';
import Popover, {
  componentTheme as popoverComponentTheme
} from '../Popover/Popover';
import PopoverContent from '../Popover/PopoverContent';

type Props = {
  /** Trigger for the Tooltip */
  children: React$Node,
  /** Content of the Tooltip */
  content: string,
  /**
   * Open the Tooltip upon initialization. Primarily for use with uncontrolled
   * components.
   */
  defaultIsOpen?: boolean,
  /** Disables the Tooltip */
  disabled?: boolean,
  /** Include an arrow on the Tooltip content pointing to the trigger */
  hasArrow?: boolean,
  /** Id of the Tooltip */
  id?: string,
  /**
   * Determines whether the Tooltip is open. For use with controlled components.
   */
  isOpen?: boolean,
  /**
   * Plugins that are used to alter behavior. See
   * [PopperJS docs](https://popper.js.org/popper-documentation.html#modifiers)
   * for options.
   */
  modifiers?: Object,
  /** Called when Tooltip is closed */
  onClose?: (event: SyntheticEvent<>) => void,
  /** Called when Tooltip is opened */
  onOpen?: (event: SyntheticEvent<>) => void,
  /** Placement of the Tooltip */
  placement?:
    | 'auto'
    | 'auto-end'
    | 'auto-start'
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left'
    | 'left-end'
    | 'left-start'
    | 'right'
    | 'right-end'
    | 'right-start'
    | 'top'
    | 'top-end'
    | 'top-start',
  /** @Private Tooltips should not have subtitles and will be removed */
  subtitle?: any,
  /** @Private Tooltips should not have titles and will be removed */
  title?: any,
  /**
   * Use a Portal to render the Tooltip to the body rather than as a sibling
   * to the trigger.
   */
  usePortal?: boolean
};

type State = {
  isOpen: boolean
};

type PropGetter = (props?: Object) => Object;
type RenderFn = (props?: RenderProps) => React$Node;
type RenderProps = {
  props: Object
};

const DELAY_OPEN = 250; // ms

// prettier-ignore
export const componentTheme = (baseTheme: Object) => {
  return {
    ...mapComponentThemes(
      {
        name: 'Popover',
        theme: popoverComponentTheme(baseTheme)
      },
      {
        name: 'Tooltip',
        theme: {
          TooltipArrow_backgroundColor: baseTheme.panel_backgroundColor_inverted,
          TooltipArrow_borderColor: baseTheme.panel_borderColor_inverted,

          TooltipContent_backgroundColor:
            baseTheme.panel_backgroundColor_inverted,
          TooltipContent_borderColor: baseTheme.panel_borderColor_inverted,
          TooltipContent_color: baseTheme.color_inverted,
          TooltipContent_maxWidth: '18em',

          TooltipContentBlock_marginVertical: '0',
          TooltipContentBlock_paddingHorizontal: baseTheme.space_inset_md,

          TooltipTriggerText_borderStyle: 'dashed',
          TooltipTriggerText_borderColor: 'currentcolor',
          TooltipTriggerText_borderWidth: '1px'
        }
      },
      baseTheme
    )
  };
};

const Root = createThemedComponent(Popover, ({ theme: baseTheme }) => {
  return {
    ...mapComponentThemes(
      {
        name: 'Tooltip',
        theme: componentTheme(baseTheme)
      },
      {
        name: 'Popover',
        theme: {}
      },
      baseTheme
    )
  };
});

const TriggerText = createStyledComponent('span', ({ theme: baseTheme }) => {
  const theme = componentTheme(baseTheme);

  return {
    borderBottomStyle: theme.TooltipTriggerText_borderStyle,
    borderBottomColor: theme.TooltipTriggerText_borderColor,
    borderBottomWidth: theme.TooltipTriggerText_borderWidth
  };
});

/**
 * Tooltips display supporting information to disambiguate user controls and text.
 */
export default class Tooltip extends Component<Props, State> {
  static defaultProps = {
    hasArrow: true
  };

  state: State = {
    isOpen: Boolean(this.props.defaultIsOpen)
  };

  id: string = this.props.id || `tooltip-${generateId()}`;

  openTimer: ?number;

  componentWillUnmount() {
    this.clearOpenTimer();
  }

  render() {
    const {
      children,
      disabled,

      // Disallow these props passed to Popover
      subtitle: ignoreSubtitle,
      title: ignoreTitle,

      ...restProps
    } = this.props;

    if (disabled) {
      return children;
    }

    const popoverProps = {
      ...restProps,
      children: this.renderTrigger(),
      focusTriggerOnClose: false,
      id: this.id,
      isOpen: this.getControllableValue('isOpen'),
      onClose: this.close,
      onOpen: this.open,
      content: this.renderContent
    };

    return <Root {...popoverProps} />;
  }

  getTriggerProps: PropGetter = (props = {}) => {
    return {
      ...props,
      'aria-expanded': undefined,
      onBlur: composeEventHandlers(props.onBlur, this.close),
      onFocus: composeEventHandlers(props.onFocus, this.handleDelayedOpen),
      onMouseEnter: composeEventHandlers(
        props.onMouseEnter,
        this.handleDelayedOpen
      ),
      onMouseLeave: composeEventHandlers(props.onMouseLeave, this.close),
      tabIndex: 0
    };
  };

  renderTrigger = () => {
    const { children } = this.props;

    const trigger =
      typeof children === 'string' ? (
        <TriggerText>{children}</TriggerText>
      ) : (
        children
      );

    const child = Children.only(trigger);

    return cloneElement(child, this.getTriggerProps(child.props));
  };

  getContentProps: PropGetter = (props = {}) => {
    const { content } = this.props;
    const { tabIndex: ignoreTabIndex, ...restProps } = props;

    return {
      ...restProps,
      'aria-live': 'polite',
      children: content,
      role: 'tooltip'
    };
  };

  renderContent: RenderFn = ({ props } = {}) => {
    return <PopoverContent {...this.getContentProps(props)} />;
  };

  handleDelayedOpen = (event: SyntheticEvent<>) => {
    this.clearOpenTimer();
    const isOpen = this.getControllableValue('isOpen');
    if (!isOpen) {
      this.openTimer = global.setTimeout(() => {
        this.open(event);
      }, DELAY_OPEN);
    }
  };

  clearOpenTimer = () => {
    global.clearTimeout(this.openTimer);
    this.openTimer = null;
  };

  open = (event: SyntheticEvent<>) => {
    if (this.isControlled('isOpen')) {
      this.openActions(event);
    } else {
      this.setState({ isOpen: true }, () => {
        this.openActions(event);
      });
    }
  };

  openActions = (event: SyntheticEvent<>) => {
    this.props.onOpen && this.props.onOpen(event);
  };

  close = (event: SyntheticEvent<>) => {
    this.clearOpenTimer();
    if (this.isControlled('isOpen')) {
      this.closeActions(event);
    } else {
      this.setState({ isOpen: false }, () => {
        this.closeActions(event);
      });
    }
  };

  closeActions = (event: SyntheticEvent<>) => {
    this.props.onClose && this.props.onClose(event);
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
