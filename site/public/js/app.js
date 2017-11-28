$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(u) {
    hideLoginModal();
    if (u) {
      console.log(u);
      var name;
      if (u.displayName) {
        name = u.displayName;
      } else {
        name = u.email.substr(0, u.email.indexOf('@'));
      }
      $('#login-head')
        .text(name)
        .css('font-weight', 'bold');
      toastr.success('login successful');
    }
  });
});

$('#google_login').on('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
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

$('#login-btn').on('click', function(e) {
  e.preventDefault();
  var email = $('#email-login').val();
  var password = $('#password-login').val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      shakeModal();
    });
});

$('#register-btn').on('click', function(e) {
  e.preventDefault();
  console.log('click');
  var email = $('#email-register').val();
  var password = $('#password-register').val();
  var passwordRep = $('#password-register-rep').val();
  if (password === passwordRep) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        shakeModalRegister();
      });
  } else {
    shakeModalPass();
  }
});

function showRegisterForm() {
  $('.loginBox').fadeOut('fast', function() {
    $('.registerBox').fadeIn('fast');
    $('.login-footer').fadeOut('fast', function() {
      $('.register-footer').fadeIn('fast');
    });
    $('.modal-title').html('Register with');
  });
  $('.error')
    .removeClass('alert alert-danger')
    .html('');
}
function showLoginForm() {
  $('#loginModal .registerBox').fadeOut('fast', function() {
    $('.loginBox').fadeIn('fast');
    $('.register-footer').fadeOut('fast', function() {
      $('.login-footer').fadeIn('fast');
    });

    $('.modal-title').html('Login with');
  });
  $('.error')
    .removeClass('alert alert-danger')
    .html('');
}

function hideLoginModal() {
  setTimeout(function() {
    $('#loginModal').modal('hide');
  }, 230);
}

function openLoginModal() {
  showLoginForm();
  setTimeout(function() {
    $('#loginModal').modal('show');
  }, 230);
}
function openRegisterModal() {
  showRegisterForm();
  setTimeout(function() {
    $('#loginModal').modal('show');
  }, 230);
}

function loginAjax() {
  shakeModal();
}

function shakeModal() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('Invalid email/password combination');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

function shakeModalPass() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('Password is not repeated correctly');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

function shakeModalRegister() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('There was an error. This account may already be registered.');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}
