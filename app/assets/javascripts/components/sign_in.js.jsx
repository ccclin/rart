var SignIn = React.createClass({
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

  checkStatus: function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      new Noty({
        text: 'User not found', type: 'error', theme: 'relax',
        layout: 'topCenter'
      }).show();
      this.refs.password.value = "";
      this.setState({
        password: "",
      });
    }
  },

  parseJSON: function(response) {
    return response.json();
  },

  _onSubmit: function (params, error_message) {
    if(Object.keys(error_message).length != 0) {
      new Noty({
        text: error_message[Object.keys(error_message)[0]], type: 'error', theme: 'relax',
        layout: 'topCenter'
      }).show();
      return;
    }
    var token = document.head.querySelector("[name=csrf-token]").content;

    fetch('/api/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      body: JSON.stringify(params),
      credentials: 'same-origin'
    }).then(this.checkStatus)
      .then(this.parseJSON)
      .then(function(result){
        if (result.is_login) {
          window.location.href = '/';
        } else {
          var error_message = result.error_message ? result.error_message : 'User not found';
          new Noty({
            text: error_message, type: 'error', theme: 'relax',
            layout: 'topCenter'
          }).show();
          this.refs.password.value = "";
          this.setState({
            password: "",
          });
        };
      });
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
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h4>Sign In</h4>
            <form onSubmit={this.submitAndRun}>
              <div className="row">
                <div className="input-field col m6 s12">
                  <input id="user_name" ref="user_name" type="text" className="validate"></input>
                  <label htmlFor="user_name">User Name</label>
                </div>
                <div className="input-field col m6 s12">
                  <input id="password" ref="password" type="password" className="validate"></input>
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col m4 offset-m8 s6 offset-s6">
                  <button className="btn waves-effect waves-light right" type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
