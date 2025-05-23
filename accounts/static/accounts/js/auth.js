function flip() {
  document.getElementById('auth-container').classList.toggle('flipped');
}

// Add slight animation delay to form elements for better visual flow
document.addEventListener('DOMContentLoaded', function() {
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach((group, index) => {
    group.style.transitionDelay = `${index * 50}ms`;
    group.style.opacity = '0';
    group.style.transform = 'translateY(10px)';
    setTimeout(() => {
      group.style.opacity = '1';
      group.style.transform = 'translateY(0)';
    }, 100 + index * 50);
  });

  // Password validation logic
  const password1 = document.querySelector('input[name="password1"]');
  const password2 = document.querySelector('input[name="password2"]');
  
  if (password1 && password2) {
    password1.addEventListener('input', validatePassword);
    password2.addEventListener('input', validatePasswordConfirmation);
  }

  function validatePassword() {
    const password = password1.value;
    const lengthReq = document.getElementById('length-req');
    const numReq = document.getElementById('num-req');
    const upperReq = document.getElementById('upper-req');
    const specialReq = document.getElementById('special-req');

    // Validate length
    if (password.length >= 8) {
      lengthReq.classList.add('valid');
      lengthReq.classList.remove('invalid');
      lengthReq.querySelector('.requirement-icon').textContent = '✓';
    } else {
      lengthReq.classList.add('invalid');
      lengthReq.classList.remove('valid');
      lengthReq.querySelector('.requirement-icon').textContent = '✗';
    }

    // Validate number
    if (/\d/.test(password)) {
      numReq.classList.add('valid');
      numReq.classList.remove('invalid');
      numReq.querySelector('.requirement-icon').textContent = '✓';
    } else {
      numReq.classList.add('invalid');
      numReq.classList.remove('valid');
      numReq.querySelector('.requirement-icon').textContent = '✗';
    }

    // Validate uppercase
    if (/[A-Z]/.test(password)) {
      upperReq.classList.add('valid');
      upperReq.classList.remove('invalid');
      upperReq.querySelector('.requirement-icon').textContent = '✓';
    } else {
      upperReq.classList.add('invalid');
      upperReq.classList.remove('valid');
      upperReq.querySelector('.requirement-icon').textContent = '✗';
    }

    // Validate special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      specialReq.classList.add('valid');
      specialReq.classList.remove('invalid');
      specialReq.querySelector('.requirement-icon').textContent = '✓';
    } else {
      specialReq.classList.add('invalid');
      specialReq.classList.remove('valid');
      specialReq.querySelector('.requirement-icon').textContent = '✗';
    }

    // If passwords are both entered, validate confirmation
    if (password2.value) {
      validatePasswordConfirmation();
    }
  }

  function validatePasswordConfirmation() {
    const confirmMessage = document.getElementById('confirm-message');
    if (password1.value && password2.value) {
      if (password1.value === password2.value) {
        confirmMessage.style.display = 'block';
        confirmMessage.querySelector('.requirement').classList.add('valid');
        confirmMessage.querySelector('.requirement').classList.remove('invalid');
        confirmMessage.querySelector('.requirement-icon').textContent = '✓';
        confirmMessage.querySelector('span:last-child').textContent = 'Passwords match';
      } else {
        confirmMessage.style.display = 'block';
        confirmMessage.querySelector('.requirement').classList.add('invalid');
        confirmMessage.querySelector('.requirement').classList.remove('valid');
        confirmMessage.querySelector('.requirement-icon').textContent = '✗';
        confirmMessage.querySelector('span:last-child').textContent = 'Passwords do not match';
      }
    } else {
      confirmMessage.style.display = 'none';
    }
  }
});
