import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText, SelectField, MenuItem, TextField } from 'material-ui';
import RichEditor from '../components/richeditor/index.js';
import { fetchPost } from '../actions/postAction.js';

class Post extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      title: '',
      tab: 'default'
    };
  }

  _onhandleClick(content) {
    const { dispatch } = this.props;
    const post = {
      title: this.state.title,
      tab: this.state.tab,
      content: content
    };
    dispatch(fetchPost(post));
  }

  _handleTextChange(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  _handleSelectChange = (event, index, tab) => this.setState({tab})

  render() {
    return (
      <div className="post">
      <Card>
        <CardHeader
          title="首页 / 发布话题"
          className="header"
        />
        <CardText className="postMain">
          <div>
            <SelectField value={this.state.tab} onChange={this._handleSelectChange}>
              <MenuItem value="default" primaryText="请选择板块" />
              <MenuItem value="share" primaryText="分享" />
              <MenuItem value="ask" primaryText="问答" />
              <MenuItem value="job" primaryText="招聘" />
            </SelectField>
          </div>
          <div>
            <TextField
              className="postTitle"
              hintText="标题字数10字以上"
              onChange={(e) => this._handleTextChange(e)}
            />
          </div>
          <RichEditor
            onHandleClick={(state) => this._onhandleClick(state)}
          />
        </CardText>
      </Card>
      </div>
    );
  }
}

export default connect()(Post);