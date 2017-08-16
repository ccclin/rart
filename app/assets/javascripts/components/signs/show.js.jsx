var SignShow = React.createClass({
  getInitialState: function () {
    return {};
  },

  componentDidMount: function() {
    document.title = "Rartorrent";
  },

  _onChange: function (e) {
    var state = {},
        value;
    if(e.target.type == 'checkbox'){
      value = e.target.checked;
    }else if(e.target.type == 'radio'){
      if($.trim(e.target.value) == 'true'){
        value = true;
      }else if($.trim(e.target.value) == 'false'){
        value = false;
      }else{
        value = $.trim(e.target.value);
      }
    }else{
      value = e.target.value;
    }
    state[e.target.name] = value;
    this.setState(state);
  },

  fetchResult: function(result) {
    if (result.is_login) {
      window.location.href = '/';
    } else {
      this.fetchError(result);
    };
  },

  fetchError: function(result) {
    if (result) {
      var error_message = result.error_message ? result.error_message : result.error ? result.error : 'Unauthorized';
      Materialize.toast(error_message, 1000);
      this.refs.password.value = "";
      this.setState({
        password: "",
      });
    };
  },

  _onSubmit: function (params, error_message) {
    if(Object.keys(error_message).length != 0) {
      Materialize.toast(error_message[Object.keys(error_message)[0]], 1000);
      return;
    }
    var token = document.head.querySelector("[name=csrf-token]").content;

    fetch('/api/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      body: JSON.stringify(params),
      credentials: 'same-origin'
    }).then(function(response){
      if (response.ok) {
        return response.json();
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then(this.fetchResult)
      .catch(function(error){
        return error.response.json();
      }).then(this.fetchError)
  },

  submitAndRun: function(e){
    e.preventDefault();
    var data = {user: {
      user_name: this.refs.user_name.value.trim(),
      password: this.refs.password.value.trim(),
    }};
    var error_message = {};
    if (this.refs.user_name.value.trim() == "") {
      error_message.user_name = "Missing User Name";
    }
    if (this.refs.password.value.trim() == "") {
      error_message.password = "Missing Password";
    }
    this._onSubmit(data, error_message);
  },

  render: function() {
    return (
      <div>
        <Navbar
          is_login={false}
        />
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h4>Sign In</h4>
            <form onSubmit={this.submitAndRun}>
              <div className="row">
                <div className="input-field col m6 s12">
                  <input id="user_name" ref="user_name" name="user_name" type="text" className="validate" onChange={this._onChange}></input>
                  <label htmlFor="user_name">User Name</label>
                </div>
                <div className="input-field col m6 s12">
                  <input id="password" ref="password" name="password" type="password" className="validate" onChange={this._onChange}></input>
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col m4 offset-m8 s6 offset-s6">
                  <button className="btn waves-effect waves-light right deep-orange darken-3" type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
