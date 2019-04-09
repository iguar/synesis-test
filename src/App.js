import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import YouTube from 'react-youtube'


import {checkVideoById, findVideoByKeyWord} from './helpers/youtube'
import VideoList from './components/VideoList'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  player: {
    margin: 5
  }
})


class App extends React.Component {

  state = {
    videoId: null,
    link: '',
    searchString: '',
    searchResults: []
  };

  embedVideoByLink = (videoId) => {
    checkVideoById(videoId).then((checkResult) => {
      if (checkResult) {
        this.setState({videoId: checkResult, searchResults: [], searchString: ''})
      } else {
        this.setState({videoId: null, searchResults: [], searchString: ''})
      }
    }).catch((err) => {
      throw err
    })
  }


  handleChange = name => event => {
    let callback = () => {}
    if (name === 'searchString') {
      callback = () => {
        this.searchVideos()
      }
    }
    this.setState({[name]: event.target.value}, callback)
  }

  searchVideos = () => {
    if (this.state.searchString.length >= 3) {
      findVideoByKeyWord(this.state.searchString).then((searchResults) => {
        this.setState({searchResults: searchResults, videoId: null})
      })
    }

    if (this.state.searchString.length === 0) {
      this.setState({searchResults: []})
    }
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isYoutubeLink', (value) => {
      let myRegexp = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?([a-zA-Z0-9]+)?/g;
      let match = myRegexp.exec(value);
      if (match == null) {
        this.setState({videoId: null})
        return false;
      } else {
        this.embedVideoByLink(match[6])
        return true;
      }
    });

  }

  render() {
    const {classes} = this.props;
    const
      opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      };

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ValidatorForm onSubmit={() => {
            }}>
              <TextValidator
                id="standard-helperText"
                label="Youtube link"
                type="search"
                className={classes.textField}
                helperText="Paste link here"
                margin="normal"
                validators={['isYoutubeLink']}
                errorMessages={['invalid youtube link']}
                value={this.state.link}
                onChange={this.handleChange('link')}
              />

              <TextField
                id="standard-search"
                label="Search field"
                type="search"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange('searchString')}
              />

            </ValidatorForm>
            <VideoList videos={this.state.searchResults} embedVideo={this.embedVideoByLink}/>

            {this.state.videoId && <YouTube
              className={classes.player}
              videoId={this.state.videoId}
              opts={opts}
              onReady={this._onReady}
            />}
          </Grid>

        </Grid>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo()
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);