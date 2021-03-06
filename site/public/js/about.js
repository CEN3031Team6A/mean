$(document).ready(function() {
  window.trapsourceTest = {};
  window.trapsourceTest.firebaseInit = firebaseInit;
  window.trapsourceTest.admin = admin;
  window.trapsourceTest.regular = regular;

  $('#hamburger').on('click', function() {
    var nav = $('#nav-head');
    if (nav.css('top') === '-500px') {
      $('#nav-head').css('top', 'auto');
    } else {
      $('#nav-head').css('top', '-500px');
    }
  });

  var database = firebase.database();
  var user;
  var snapshot;
  var adminOn = false;
  toastr.options.closeButton = true;

  // render function that renders the about whether in admin or in regular user
  function render() {
    if (snapshot && user && user.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
      admin(snapshot);
    } else if (snapshot) {
      regular(snapshot);
    }
  }
  // get the values for this page from the database
  database.ref('about').on('value', firebaseInit);

  function firebaseInit(s) {
    snapshot = s;
    render();
  }

  // if a user logins change the header
  firebase.auth().onAuthStateChanged(function(u) {
    window.trapsourceTest.giveMeUser = giveMeUser;
    function giveMeUser() {
      return u;
    }
    if (u) {
      var name;
      if (u.displayName) {
        name = u.displayName;
      } else {
        name = u.email.substr(0, u.email.indexOf('@'));
      }
      $('#login-head')
        .text(name)
        .css('font-weight', 'bold');
      if (u.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
        $('#nav-head').append('<a id=\'admin-head\' href=\'admin.html\'>Admin</a>');
      }
    }
    user = u;
    render();
  });

  // render the regular version of this page
  function regular(snapshot) {
    adminOn = false;
    about = snapshot.val();
    $('#aboutWrapper').replaceWith(
      '<div id="aboutWrapper"> <div id=\'about\'> <h1 id=\'abtTitle\'>' +
        about.abtTitle +
        '</h1> <h2> <div id=\'abtDescription\'>' +
        about.abtDescription +
        '</div> </h2> <div id=\'abtPar\'>' +
        about.abtPar +
        '</div> </div> </div>'
    );
  }

  // render the admin version of about
  function admin(snapshot) {
    if (adminOn === false) {
      adminOn = true;
    }
    about = snapshot.val();
    // replace the wrapper for the page with the contents of admin page, including the a save changes button
    $('#aboutWrapper').replaceWith(
      '<div id="aboutWrapper"> <div id=\'about\'> <h1 contenteditable="true" id=\'abtTitle\'>' +
        about.abtTitle +
        '</h1> <h2> <div contenteditable="true" id=\'abtDescription\'>' +
        about.abtDescription +
        '</div> </h2> <div contenteditable="true" id=\'abtPar\'>' +
        about.abtPar +
        '</div> </div> <div class="text-center"> <a id="submit_changes">Save Changes</a></div>'
    );
    //  submit changes on click handler for admin mode
    $('#submit_changes').on('click', function() {
      database.ref('about').set({
        abtTitle: $('#abtTitle').html(),
        abtDescription: $('#abtDescription').html(),
        abtPar: $('#abtPar').html()
      });
      toastr.success('Changes saved');
    });
  }
});
