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

  // checkStatus: function (response) {
  //   if (response.status >= 200 && response.status < 300) {
  //     return response;
  //   } else {
  //     noty({text: 'User not found', layout: 'center', type: 'error', theme: 'bootstrapTheme', timeout: false, maxVisible: 999});
  //     this.refs.password.value = "";
  //     this.setState({
  //       password: "",
  //     });
  //   }
  // },

  // parseJSON: function(response) {
  //   return response.json();
  // },

  // _onSubmit: function (params, error_message) {
  //   if(Object.keys(error_message).length != 0) {
  //     noty({text: error_message[Object.keys(error_message)[0]], layout: 'center', type: 'error', theme: 'bootstrapTheme', timeout: false, maxVisible: 999});
  //     return;
  //   }
  //   var token = document.head.querySelector("[name=csrf-token]").content;

  //   fetch('/api/users/sign_in', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'X-Requested-With': 'XMLHttpRequest',
  //       'X-CSRF-Token': token
  //     },
  //     body: JSON.stringify(params),
  //     credentials: 'same-origin'
  //   }).then(this.checkStatus)
  //     .then(this.parseJSON)
  //     .then(function(result){
  //       if (result.is_login) {
  //         window.location.href = '/';
  //       } else {
  //         var error_message = result.error_message ? result.error_message : 'Email/Password was wrong';
  //         noty({text: error_message, layout: 'center', type: 'error', theme: 'bootstrapTheme', timeout: false, maxVisible: 999});
  //         this.refs.password.value = "";
  //         this.setState({
  //           password: "",
  //         });
  //       };
  //     });
  // },

  // submitAndRun: function(e){
  //   e.preventDefault();
  //   var data = {api_user: {
  //     email: this.refs.email.value.trim(),
  //     password: this.refs.password.value.trim(),
  //     remember_me: this.refs.remember_me.checked,
  //   }};
  //   var error_message = {};
  //   if (this.refs.email.value.trim() == "") {
  //     error_message.email = "missing email";
  //   }
  //   if (this.refs.password.value.trim() == "") {
  //     error_message.password = "missing password";
  //   }
  //   this._onSubmit(data, error_message);
  // },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h4>Sign In</h4>
            <form>
              <div className="row">
                <div className="input-field col m6 s12">
                  <input id="user_name" type="text" className="validate"></input>
                  <label for="user_name">User Name</label>
                </div>
                <div className="input-field col m6 s12">
                  <input id="user_name" type="text" className="validate"></input>
                  <label for="user_name">User Name</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
