/* @flow */
import { Component } from 'react';
import Button from '../../../../../library/Button';
import Dialog, {
  DialogActions,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../../../library/Dialog';

export default {
  id: 'trigger',
  title: 'Trigger',
  description: `TODO`,
  scope: {
    Button,
    Component,
    Dialog,
    DialogActions,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle
  },
  source: `() => {
    class Demo extends Component {
      constructor(props) {
        super(props);

        this.state = {
          isOpen: false
        };

        this.toggleDialog = this.toggleDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }

      toggleDialog() {
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }));
      }

      handleClose() {
        this.setState(prevState => ({
          isOpen: false
        }));
      }

      render() {
        const { isOpen } = this.state;

        return (
          <div>
            <Button onClick={this.toggleDialog}>{isOpen ? 'Close' : 'Open' } Dialog</Button>
            <Dialog isOpen={isOpen} onClose={this.handleClose}>
              <DialogHeader>
                <DialogTitle>
                  Lorem ipsum dolor sit amet
                </DialogTitle>
              </DialogHeader>
              <DialogBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </DialogBody>
              <DialogFooter>
                <DialogActions>
                  <Button minimal onClick={this.toggleDialog}>Cancel</Button>
                  <Button primary onClick={this.toggleDialog}>Action</Button>
                </DialogActions>
              </DialogFooter>
            </Dialog>
          </div>
        )
      }
    }

    return <Demo />;
  }`
};
