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
      // var li_items = [];
      // this.props.side_urls.forEach(function(element) {
      //   li_items.push(<li key={element.url}><a href={element.url}>{element.name}</a></li>);
      // });

      var row = (
        <div>
           <a href="javascript:void(0)" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only"><i className="material-icons">menu</i></a>
          <ul className="right">
            <li><a href="javascript:void(0)" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      );

      var login_obj = (
        <ul id="nav-mobile" className="side-nav fixed">
          <li className="bold"><a href="getting-started.html" className="waves-effect waves-teal">Getting Started</a></li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li className="bold active"><a className="collapsible-header active waves-effect waves-teal">CSS</a>
                <div className="collapsible-body">
                  <ul>
                    <li><a href="color.html">Color</a></li>
                    <li><a href="grid.html">Grid</a></li>
                    <li><a href="helpers.html">Helpers</a></li>
                    <li><a href="media-css.html">Media</a></li>
                    <li><a href="pulse.html">Pulse</a></li>
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="shadow.html">Shadow</a></li>
                    <li><a href="table.html">Table</a></li>
                    <li><a href="css-transitions.html">Transitions</a></li>
                    <li className="active"><a href="typography.html">Typography</a></li>
                  </ul>
                </div>
              </li>
              <li className="bold"><a className="collapsible-header waves-effect waves-teal">Components</a>
                <div className="collapsible-body">
                  <ul>
                    <li><a href="badges.html">Badges</a></li>
                    <li><a href="buttons.html">Buttons</a></li>
                    <li><a href="breadcrumbs.html">Breadcrumbs</a></li>
                    <li><a href="cards.html">Cards</a></li>
                    <li><a href="chips.html">Chips</a></li>
                    <li><a href="collections.html">Collections</a></li>
                    <li><a href="footer.html">Footer</a></li>
                    <li><a href="forms.html">Forms</a></li>
                    <li><a href="icons.html">Icons</a></li>
                    <li><a href="navbar.html">Navbar</a></li>
                    <li><a href="pagination.html">Pagination</a></li>
                    <li><a href="preloader.html">Preloader</a></li>
                  </ul>
                </div>
              </li>
              <li className="bold"><a className="collapsible-header waves-effect waves-teal">JavaScript</a>
                <div className="collapsible-body">
                  <ul>
                    <li><a href="carousel.html">Carousel</a></li>
                    <li><a href="collapsible.html">Collapsible</a></li>
                    <li><a href="dialogs.html">Dialogs</a></li>
                    <li><a href="dropdown.html">Dropdown</a></li>
                    <li><a href="feature-discovery.html">FeatureDiscovery</a></li>
                    <li><a href="media.html">Media</a></li>
                    <li><a href="modals.html">Modals</a></li>
                    <li><a href="parallax.html">Parallax</a></li>
                    <li><a href="pushpin.html">Pushpin</a></li>
                    <li><a href="scrollfire.html">ScrollFire</a></li>
                    <li><a href="scrollspy.html">Scrollspy</a></li>
                    <li><a href="side-nav.html">SideNav</a></li>
                    <li><a href="tabs.html">Tabs</a></li>
                    <li><a href="transitions.html">Transitions</a></li>
                    <li><a href="waves.html">Waves</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li className="bold"><a href="mobile.html" className="waves-effect waves-teal">Mobile</a></li>
          <li className="bold"><a href="showcase.html" className="waves-effect waves-teal">Showcase</a></li>
          <li className="bold"><a href="themes.html" className="waves-effect waves-teal">Themes<span className="new badge"></span></a></li>
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
          <div className="nav-wrapper red darken-3">
            {row}
          </div>
        </nav>
        {login_obj}
      </header>
    );
  }
});
