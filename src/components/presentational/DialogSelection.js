import React, { PropTypes, Component } from 'react';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import { I18n } from 'react-i18next';

import { DialogSelectionItem } from '../common';
import { HeatMapRecord } from '../containers';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 200,
    height: 200,
    overflowY: 'scroll',
  },
};

class DialogSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      mode: '',
      fitbit: '',
    };
  }
  render() {
    return (
      <I18n>
        {
          t => (
            <div>
              <Dialog open={this.props.open}>
                <HeatMapRecord
                  page="DialogSelection"
                  light={this.props.light}
                  gameKey={this.props.gameKey}
                >
                  <DialogTitle>{t('material.title')}</DialogTitle>
                  <DialogContent
                    classes={{
                      root: this.props.classes.root,
                    }}
                  >
                    <DialogSelectionItem
                      heading={t('start.subtitle')}
                      content={[t('start.mrt'), t('start.sf'), t('start.lane')]}
                      onSelect={(val) => { this.setState({ start: val }); }}
                    />
                    <DialogSelectionItem
                      heading={t('end.subtitle')}
                      content={[t('end.hopital'), t('end.cafeteria'), t('end.auditorium')]}
                      onSelect={(val) => { this.setState({ end: val }); }}
                    />
                    <DialogSelectionItem
                      heading={t('mode.subtitle')}
                      content={[t('mode.full'), t('mode.semi'), t('mode.manual')]}
                      onSelect={(val) => { this.setState({ mode: val }); }}
                    />
                    <DialogSelectionItem
                      heading={t('fitbit.subtitle')}
                      content={[t('fitbit.none'), t('fitbit.blue'), t('fitbit.black')]}
                      onSelect={(val) => { this.setState({ fitbit: val }); }}
                    />
                  </DialogContent>
                  <Divider />
                  <DialogActions>
                    <Button onClick={() => { this.props.deny(); }} color="primary" autoFocus>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        const {
                        start, end, mode, fitbit,
                        } = this.state;
                        const { light } = this.props;
                        if (start.length && end.length && mode.length && fitbit.length) {
                          /*
                             這裡是一個 apply 的 function props
                             透過這個 function 將 child 的 props 值
                             傳給 parent
                          */
                          this.props.apply(start, end, mode, fitbit, light);
                        }
                      }}
                      color="primary"
                      autoFocus
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </HeatMapRecord>
              </Dialog>
            </div>
          )
        }
      </I18n>
    );
  }
}

DialogSelection.propTypes = {
  classes: PropTypes.shape().isRequired,
  apply: PropTypes.func.isRequired,
  deny: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  light: PropTypes.bool.isRequired,
  gameKey: PropTypes.string.isRequired,
};


export default withStyles(styles, { withTheme: true }, { withMobileDialog: true })(DialogSelection);
