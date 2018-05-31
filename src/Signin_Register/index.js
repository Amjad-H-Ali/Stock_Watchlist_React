import React, { Component } from 'react';


class Signin_Register extends Component{

	constructor() {
		super();

		this.state = {
			emailInput:'',
			pswInput:'',
			registering:false
		}
	}
	setRegistering = (e) => {
		e.target.innerText === 'Register' ? this.setState({registering: true}) : this.setState({registering: false});
	}

	handleEmailInput = (e) => {
		this.setState({emailInput:e.target.value});
	}

	handlePasswordInput = (e) => {
		this.setState({pswInput:e.target.value});
	}

	handleSubmit = (e) => {

		e.preventDefault();

		const {state:{registering, emailInput, pswInput}, props:{signUp, signIn}} = this;
		

		if (registering) {
			signUp(emailInput, pswInput);
		}
		else {
			console.log(emailInput);
			signIn(emailInput, pswInput);
		}

	}

	

	render(){
		return (
				
			<div id="myModal" className="modal">

	          <div className="modal-content">
	            <div className="modal-header">
	              <span onClick={this.props.showModal} className="close">&times;</span>
	              <h2 className="modal-title">{this.state.registering ? 'Sign Up' : 'Sign In'}</h2>
	            </div>

	            <div className="modal-body">
	              <form className="sign-form" onSubmit={this.handleSubmit}>
	                <div className="tabs"> <div onClick={this.setRegistering} className="sign-tab">Sign In</div> <div onClick={this.setRegistering} className="register-tab"> Register</div> </div>
	                <div className="email-input-div"><div className="label">Email</div><input value={this.state.emailInput} onChange={this.handleEmailInput} className="email-input" type="text" placeholder="Enter Your Email"/></div>
	                <div className="password-input-div"><div className="label">Password</div><input value={this.state.pswInput} onChange={this.handlePasswordInput} className="password-input" type="text" placeholder={this.state.registering ? "Create A Password":"Enter Your Password"}/></div>
	                <div className="submit-btn-input-div"><button className="submit-btn">{this.state.registering ? 'Sign Up':'Sign In'}</button></div>
	              </form>  
	            </div>
	          </div>
	        </div> 
		)
	}

}

export default Signin_Register;