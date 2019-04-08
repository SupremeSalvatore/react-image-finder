import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
  DialogActions,
  Button
} from '@material-ui/core';
import ZoomIn from '@material-ui/icons/ZoomIn';
import CloseIcon from '@material-ui/icons/Close';

export class ImageResults extends Component {
  state = {
    open: false,
    currentImg: ''
  };
  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    let imageListContent;
    const { images } = this.props;
    const { open, currentImg } = this.state;
    if (images) {
      imageListContent = (
        <GridList cols={2} cellHeight={350}>
          {images.map(img => (
            <GridListTile key={img.id}>
              <img src={img.largeImageURL} alt="" />
              <GridListTileBar
                title={img.tags}
                subtitle={
                  <span>
                    by <strong>{img.user}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton
                    onClick={() => this.handleOpen(img.largeImageURL)}>
                    <ZoomIn style={{ color: 'white' }} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    return (
      <Fragment>
        {imageListContent}
        <Dialog onClose={this.handleClose} open={open}>
          <DialogActions>
            <Button onClick={this.handleClose}>
              <CloseIcon />
            </Button>
          </DialogActions>
          <img src={currentImg} alt="" style={{ width: '100%' }} />
        </Dialog>
      </Fragment>
    );
  }
}
ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};
export default ImageResults;
