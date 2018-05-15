/* @flow */
import { Component } from 'react';
import deepEqual from 'react-fast-compare';

type Props = {
  children: (props: Object) => React$Node,
  data: Data,
  defaultSelected?: Data,
  onToggle?: (item: Item, selected: boolean) => void,
  onToggleAll?: (items: Data, selected: boolean) => void,
  selected?: Data
};

type State = {
  selected: Data
};

type Data = Array<Item>;
type Item = {
  disabled?: boolean
};
export type SelectableType = {
  all: boolean,
  some: boolean,
  isSelected: (item: Item) => boolean,
  toggle: Toggle,
  toggleAll: ToggleAll
};
export type Toggle = (item: Item) => void;
export type ToggleAll = () => void;

export default class Selectable extends Component<Props, State> {
  state = {
    selected: this.props.defaultSelected || []
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!deepEqual(this.props.selected, nextProps.selected)) {
      this.setState({
        selected: nextProps.selected
      });
    }
  }

  render() {
    const props = {
      ...this.props,
      selectable: {
        ...this.state,
        all: this.allSelected(),
        some: this.someSelected(),
        isSelected: this.isSelected,
        toggle: this.toggle,
        toggleAll: this.toggleAll
      }
    };

    return this.props.children(props);
  }

  toggle = (item: Item) => {
    if (this.isControlled('selected')) {
      this.toggleActions(item);
    } else {
      this.setState(
        (prevState) => {
          const selected = prevState.selected.slice(0);
          const index = selected.indexOf(item);
          const hasItem = index !== -1;
          hasItem ? selected.splice(index, 1) : selected.push(item);

          return {
            selected
          };
        },
        () => {
          this.toggleActions(item);
        }
      );
    }
  };

  toggleActions = (item: Item) => {
    const { onToggle } = this.props;
    onToggle && onToggle(item, this.isSelected(item));
  };

  toggleAll = () => {
    if (this.isControlled('selected')) {
      this.toggleAllActions(!this.allSelected());
    } else {
      this.setState(
        {
          selected:
            this.allSelected() || this.someSelected() ? [] : this.props.data
        },
        () => {
          this.toggleAllActions(this.allSelected());
        }
      );
    }
  };

  toggleAllActions = (all: boolean) => {
    const { data, onToggleAll } = this.props;
    onToggleAll && onToggleAll(all ? data : [], all);
  };

  allSelected = () => {
    const selected = this.getControllableValue('selected');
    return selected && selected.length === this.props.data.length;
  };

  someSelected = () => {
    const selected = this.getControllableValue('selected');
    const all = this.allSelected();
    return selected && selected.length > 0 && !all;
  };

  isSelected = (item: Item) => {
    const selected = this.getControllableValue('selected');
    return selected && selected.indexOf(item) !== -1;
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
