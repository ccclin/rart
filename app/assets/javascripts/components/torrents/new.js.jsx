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
              <form action="#">
                <h4>Upload File or Magnet Url</h4>
                <div className="file-field input-field col m12 s12">
                  <div className="btn">
                    <span>File</span>
                    <input type="file"></input>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                  </div>
                </div>
                <div className="input-field col m12 s12">
                  <input id="magnet_url" type="text" className="validate"></input>
                  <label htmlFor="magnet_url">Magnet Url</label>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
});
