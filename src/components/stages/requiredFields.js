import React, { Component } from 'react';

export default class RequiredStageFields extends Component {
  render() {
    const formStyles={
      marginTop: '20%'
    }

    const saveButtonStyle={
      marginTop: '5px'
    }

    const textareaStyle={
      width: '100%'
    }
    return (
      <div>
        <div className="form-group">
          <label>Stage Name</label>
          <input type="text" className="form-control" id="stageName" placeholder="Ex. The lost scientist" />
          <button style={saveButtonStyle} className="btn btn-primary">Save</button>
        </div>
        <div className="form-group">
          <label>Content</label>
          <br/>
          <textarea style={textareaStyle} className="form-control" rows="5" id="comment" placeholder='The challenge to solve'></textarea>
          <button style={saveButtonStyle} className="btn btn-primary">Save</button>
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <br/>
          <textarea style={textareaStyle} className="form-control" rows="5" id="comment" placeholder='The instructions of your challenge'></textarea>
          <button style={saveButtonStyle} className="btn btn-primary">Save</button>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input type="text" className="form-control" id="stageName" placeholder="The answer/solution to your challenge" />
          <button style={saveButtonStyle} className="btn btn-primary">Save</button>
        </div>
      </div>
    );
  }
}
