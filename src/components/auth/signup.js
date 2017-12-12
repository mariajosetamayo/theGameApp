import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';


const renderInput = (field) => (
   <div>
     <input {...field.input} type={field.type} className="form-control" />
     {field.meta.touched && field.meta.error && <span className='error'>{field.meta.error}</span>}
   </div>
)

class Signup extends Component {

  handleFormSubmit(formProps){
    this.props.signupUser(formProps);
  }

  renderAlert (){
    if( this.props.errorMessage){
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    // console.log('THIS IS THE STATE', state)
    const { handleSubmit, fields: { username, email, password, passwordConfirm}} = this.props;
    return (
      <div onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <form>
          <fieldset className="form-group">
            <label>Username</label>
            <Field
            name="username"
            component={renderInput}
            type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Email</label>
            <Field
            name="email"
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
          <fieldset className="form-group">
            <label>Password confirm</label>
            <Field
            name="passwordConfirm"
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

function validate(formProps) {
  const errors={};

  if(!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords much match';
  }

  return errors;
}

function mapStateToProps(state){
  console.log('this is the state', state)
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['username','email', 'password', 'passwordConfirm'],
  validate
})(connect(mapStateToProps, actions)(Signup));
