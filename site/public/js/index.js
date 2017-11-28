$(document).ready(function adminWrapper() {
  var database = firebase.database();
  var provider = new firebase.auth.GoogleAuthProvider();
  var user;
  var snapshot;
  var adminOn = false;
  toastr.options.closeButton = true;
  function render() {
    if (snapshot && user && user.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
      admin(snapshot);
    } else if (snapshot) {
      regular(snapshot);
    }
  }
  database.ref('index').on('value', function(s) {
    snapshot = s;
    render();
  });

  function regular(snapshot) {
    adminOn = false;
    console.log('switching to regular');
    var index = snapshot.val();
    $('#body').replaceWith(
      '<div id=\'body\'> <header> <a href=\'index\'> <img id=\'logo\' src=\'images/logo.png\' alt=\'Trap Source Logo\'> </a> <nav> <a id=\'current_page\' href=\'index.html\'>Home</a> <a href=\'tree.html\'>Tree</a> <a href=\'admin.html\'>Admin</a> <a href=\'about.html\'>About</a> </nav> <img id=\'hamburger\' src=\'images/hamburger.svg\' alt=\'Menu\'> </header> <div id=\'nav_line\'></div> <div id=\'jumbotron\'> <h1 id=\'jmbTitle\'>' +
        index.jmbTitle +
        '</h1> <div class=\'jmb_ttl\'> <div id=\'jmbDescription\'>' +
        index.jmbDescription +
        '</div> </div> <div class=\'jmb_btn\' id=\'sign_in\'>Sign in</div> <a class=\'jmb_btn\' id=\'learn_more\' href=\'about\'>Learn more</a> </div> <div id=\'text_column_wrapper\'> <article class=\'text_column\'> <div> <img src=\'images/icon1.svg\' alt=\'icon\'> <h2 id=\'mainTitle1\'>' +
        index.mainTitle1 +
        '</h2> </div> <div id=\'mainPar1\'>' +
        index.mainPar1 +
        '</div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon2.svg\' alt=\'icon\'> <h2 id=\'mainTitle2\'>' +
        index.mainTitle2 +
        '</h2> </div> <div id=\'mainPar2\'>' +
        index.mainPar2 +
        '</div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon3.svg\' alt=\'icon\'> <h2 id=\'mainTitle3\'>' +
        index.mainTitle3 +
        '</h2> </div> <div id=\'mainPar3\'>' +
        index.mainPar3 +
        '</div> </article class=\'text_column\'> </div> <div id=\'footer_line\'></div> <footer> <p>Copyright © 2017 Trap Source</p> <p id=\'developed_by\'>Developed with ♥ by team 6A </p> </footer> </div >'
    );

    $('#sign_in').on('click', function signInHandler() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          user = result.user;
          console.log(user);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('error loging in', errorCode, errorMessage);
        });
    });
  }

  function admin(snapshot) {
    if (adminOn === false) {
      toastr.success('Switched to admin mode');
      adminOn = true;
    }
    console.log('switching to admin');
    var index = snapshot.val();
    $('#body').replaceWith(
      '<div id=\'body\'> <header> <a href=\'index\'> <img id=\'logo\' src=\'images/logo.png\' alt=\'Trap Source Logo\'> </a> <nav> <a id=\'current_page\' href=\'index.html\'>Home</a> <a href=\'tree.html\'>Tree</a> <a href=\'admin.html\'>Admin</a> <a href=\'about.html\'>About</a> </nav> <img id=\'hamburger\' src=\'images/hamburger.svg\' alt=\'Menu\'> </header> <div id=\'nav_line\'></div> <div id=\'jumbotron\'> <h1 id=\'jmbTitle\' contenteditable=\'true\'>' +
        index.jmbTitle +
        ' </h1> <div class=\'jmb_ttl\'> <div id=\'jmbDescription\' contenteditable=\'true\'>' +
        index.jmbDescription +
        '</div> </div> <div class="jmb_btn" id="sign_out">Sign out</div> <a id=\'learn_more\' href=\'about\'>Learn more</a> </div> <div id=\'text_column_wrapper\'> <article class=\'text_column\'> <div> <img src=\'images/icon1.svg\' alt=\'icon\'> <h2 id=\'mainTitle1\' contenteditable=\'true\'>' +
        index.mainTitle1 +
        '</h2> </div> <div id=\'mainPar1\' contenteditable=\'true\'>' +
        index.mainPar1 +
        '</div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon2.svg\' alt=\'icon\'> <h2 id=\'mainTitle2\' contenteditable=\'true\'>' +
        index.mainTitle2 +
        '</h2> </div> <div id=\'mainPar2\' contenteditable=\'true\'>' +
        index.mainPar2 +
        '</div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon3.svg\' alt=\'icon\'> <h2 id=\'mainTitle3\' contenteditable=\'true\'>' +
        index.mainTitle3 +
        '</h2> </div> <div id=\'mainPar3\' contenteditable=\'true\'>' +
        index.mainPar3 +
        '</div> </article class=\'text_column\'> </div> <div class=\'row\'> <div class=\'col-xs-12 text-center\'> <a id=\'submit_changes\'>Save Changes</a> </div> </div> <div id=\'footer_line\'></div> <footer> <p>Copyright © 2017 Trap Source</p> <p id=\'developed_by\'>Developed with ♥ by team 6A </p> </footer> </div>'
    );
    $('#submit_changes').on('click', function indexSubmitHandler() {
      var jmbTitle = $('#jmbTitle').html();
      var jmbDescription = $('#jmbDescription').html();
      var mainTitle1 = $('#mainTitle1').html();
      var mainTitle2 = $('#mainTitle2').html();
      var mainTitle3 = $('#mainTitle3').html();
      var mainPar1 = $('#mainPar1').html();
      var mainPar2 = $('#mainPar2').html();
      var mainPar3 = $('#mainPar3').html();

      database
        .ref('index')
        .set({
          jmbTitle: jmbTitle,
          jmbDescription: jmbDescription,
          mainTitle1: mainTitle1,
          mainTitle2: mainTitle2,
          mainTitle3: mainTitle3,
          mainPar1: mainPar1,
          mainPar2: mainPar2,
          mainPar3: mainPar3
        })
        .then(function() {
          toastr.success('Changes saved');
        });
    });

    $('#sign_out').on('click', function() {
      firebase
        .auth()
        .signOut()
        .then(
          function() {
            console.log('Signed Out');
            toastr.success('Signed out');
          },
          function(error) {
            console.error('Sign Out Error', error);
          }
        );
    });
    $('div[contenteditable]').keydown(function(e) {
      // trap the return key being pressed
      if (e.keyCode === 13) {
        // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
        document.execCommand('insertHTML', false, '<br><br>');
        // prevent the default behaviour of return key pressed
        return false;
      }
    });
  }

  firebase.auth().onAuthStateChanged(function(u) {
    user = u;
    render();
  });
});