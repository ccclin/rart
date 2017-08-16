var TorrentNew = React.createClass({
  getInitialState: function () {
    return {
      is_login: false,
      side_urls: [],
      controller: ""
    };
  },

  componentDidMount: function() {
    this.loadPage(this.props.source);
    document.title = "Rartorrent";
  },

  fetchloadPageResult: function(result) {
    this.setState({
      is_login: result.is_login,
      side_urls: result.side_urls,
      controller: result.controller
    });
  },

  fetchError: function(result) {
    if (result) {
      var error_message = result.error_message ? result.error_message : result.error ? result.error : 'Unauthorized';
      Materialize.toast(error_message, 1000);
    };
  },

  fetchApi: function(url, action, params, successResultFuntion) {
    var token = document.head.querySelector("[name=csrf-token]").content;
    var body = action == "GET" ?  null : JSON.stringify(params);

    fetch(url, {
      method: action,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      body: body,
      credentials: 'same-origin'
    }).then(function(response){
      if (response.ok) {
        return response.json();
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then(successResultFuntion)
      .catch(function(error){
        return error.response.json();
      }).then(this.fetchError)
  },

  loadPage: function(url) {
    this.fetchApi(url, 'GET', null, this.fetchloadPageResult);
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
    }else if(e.target.type == 'file'){
      if (e.dataTransfer) {
        value = e.dataTransfer.files;
      } else if (e.target) {
        value = e.target.files;
      }
    }else{
      value = e.target.value;
    }
    state[e.target.name] = value;
    this.setState(state);
  },

  submitAndRun: function(e){
    e.preventDefault();
    var data = {torrent: {
      torrent_file: this.refs.torrent_file.files,
      magnet_url: this.refs.magnet_url.value.trim(),
    }};
    if (this.refs.magnet_url.value.trim() == "" && this.refs.torrent_file.files.length == 0) {
      Materialize.toast("You need set one", 1000);
      return;
    }
    // this._onSubmit(data, error_message);
  },

  render: function() {
    return (
      <div>
        <Navbar
          is_login={this.state.is_login}
          side_urls={this.state.side_urls}
          controller={this.state.controller}
        />
        <main>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <form onSubmit={this.submitAndRun}>
                <h4>Upload File or Magnet Url</h4>
                <div className="file-field input-field col m12 s12">
                  <div className="btn deep-orange darken-3">
                    <span>File</span>
                    <input type="file" id="torrent_file" ref="torrent_file" name="torrent_file" onChange={this._onChange}></input>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                  </div>
                </div>
                <div className="input-field col m12 s12">
                  <input id="magnet_url" ref="magnet_url" name="magnet_url" type="text" className="validate"></input>
                  <label htmlFor="magnet_url">Magnet Url</label>
                </div>
                <div className="col m4 offset-m8 s6 offset-s6">
                  <button className="btn waves-effect waves-light right deep-orange darken-3" type="submit">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
});
