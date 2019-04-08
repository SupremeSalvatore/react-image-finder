import React, { Component } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import ImageResults from '../ImageResults/ImageResults';
const styles = {
  Grid: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  }
};
export class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: `${process.env.REACT_APP_BASE_URL}`,
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    selectOptions: [5, 10, 15, 30, 50],
    images: []
  };
  async getImages() {
    const { searchText, amount, apiUrl, apiKey } = this.state;
    try {
      const data = await fetch(
        `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
      );
      const jsonData = await data.json();
      this.setState({
        images: jsonData.hits
      });
    } catch (error) {
      console.error(error);
    }
  }
  componentWillMount() {
    this.getImages();
  }
  onTextChange = e => {
    e.preventDefault();
    let inputValue = e.target.value;
    this.setState(
      {
        [e.target.name]: inputValue
      },
      () => {
        inputValue === '' ? this.setState({ images: [] }) : this.getImages();
      }
    );
  };
  onAmountChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.getImages();
      }
    );
  };
  render() {
    const { searchText, amount, selectOptions, images } = this.state;
    const { onTextChange, onAmountChange } = this;
    return (
      <Grid container>
        <Grid item md={6} sm={12} xs={12} style={styles.Grid}>
          <TextField
            label="Search for Images"
            placeholder="Enter picture you want to see..."
            name="searchText"
            value={searchText}
            onChange={onTextChange}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} style={styles.Grid}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="amount-id">Amount</InputLabel>
            <Select
              value={amount}
              onChange={onAmountChange}
              inputProps={{
                name: 'amount'
              }}>
              {selectOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {images.length ? (
          <ImageResults images={this.state.images} />
        ) : (
          <div>No pictures found, plese try again</div>
        )}
      </Grid>
    );
  }
}

export default Search;
