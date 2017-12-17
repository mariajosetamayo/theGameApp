import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderInput = (field) => (
   <div>
     <input {...field.input} type={field.type} className="form-control" />
     {field.meta.touched && field.meta.error}
     <span>{field.meta.error}</span>
   </div>
)

class Signin extends Component {

  handleFormSubmit({username, password}){
    console.log(username, password);
    this.props.signinUser({ username, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className= 'alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const formContainerStyle={
      marginTop: '20%',
      width: '50%',
      margin: '0 auto'
    }

    const formStyle={
      marginTop:'30%'
    }
    const { handleSubmit, fields: { username, password }} = this.props;
      console.log(this.props)
    return (
      <div style={formContainerStyle}>
        <form style={formStyle} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Username</label>
          <Field
          name="username"
          component={renderInput}
          type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <Field
          name="password"
          component={renderInput}
          type="password" />
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(connect(mapStateToProps, actions)(Signin));
