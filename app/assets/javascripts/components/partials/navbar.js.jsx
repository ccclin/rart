var Navbar = React.createClass({
  componentDidUpdate: function(){
    $(".button-collapse").sideNav();
  },

  handleLogout: function() {
    var token = document.head.querySelector("[name=csrf-token]").content;

    fetch('/api/sign_out', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      credentials: 'same-origin'
    }).then(function(response){
      if (response.ok) {
        window.location.href = '/';
        return;
      }
    });
  },

  render: function() {
    if (this.props.is_login) {
      var row = (
        <div>
           <a href="javascript:void(0)" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only"><i className="material-icons">menu</i></a>
          <ul className="right">
            <li><a href="javascript:void(0)" onClick={this.handleLogout}>Sign Out</a></li>
          </ul>
        </div>
      );

      var side_urls = [];
      var props = this.props;
      this.props.side_urls.forEach(function(element) {
        if (element.controller == props.controller) {
          side_urls.push(
            <li className="active bold red accent-2" key={element.url}><a href={element.url} className="waves-effect waves-teal">{element.name}</a></li>
          );
        } else {
          side_urls.push(
            <li className="bold" key={element.url}><a href={element.url} className="waves-effect waves-teal">{element.name}</a></li>
          );
        };
      });
      side_urls.push(
        <li className="bold" key="logout"><a href="javascript:void(0)" onClick={this.handleLogout} className="waves-effect waves-teal">Sign Out</a></li>
      );

      var login_obj = (
        <ul id="nav-mobile" className="side-nav fixed">
          <li className="logo">
            <h2 className="center-align"><i className="medium material-icons">device_hub</i></h2>
          </li>
          {side_urls}
        </ul>
      )
    } else {
      var row = (
        <ul className="right">
          <li><a href="/sign">Sign In</a></li>
        </ul>
      );
    }

    return (
      <header>
        <nav className="top-nav">
          <div className="nav-wrapper red accent-2">
            {row}
          </div>
        </nav>
        {login_obj}
      </header>
    );
  }
});
