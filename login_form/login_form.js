document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = document.getElementById('useridinput').value;
    const password = document.getElementById('passwordinput').value;

    let userIdErrorMsg = document.querySelector('#userid-error-msg')
    let passwordErrorMsg = document.querySelector('#password-error-msg')

    let check = true;

    if (!userId) {
      userIdErrorMsg.style.display = 'block';
      document.textForm.userid.focus();
      check = false
    } else {
      userIdErrorMsg.style.display = 'none';
    }

    if (!password) {
      passwordErrorMsg.style.display = 'block';
      document.textForm.password.focus();
      check = false;
    } else {
      passwordErrorMsg.style.display = 'none';
    }



    if (check) {
      const loginData = {
        userId: userId,
        password: password
      }
      const jasonData = JSON.stringify(loginData);

      // console.log(loginData);
      // console.log('+++++')
      // console.log(jasonData);
      // console.log('+++++-')
      // console.log('-+++++-')


      fetch('http://192.168.0.25:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jasonData
       
      })
        .then(res => res.json())
        .then(data => {
          if(data.success) {
            // console.log(loginData);
            // console.log('------')
            // console.log(jasonData);
            // console.log('------')
            // console.log(data);
            // console.log('------')

            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userState', data.userState);

            console.log('서버 응답:', data);
            alert('로그인 성공');
            // window.location.href = 'http://localhost:63342/kostaFe/frontfirst/frontfirst2.html';

          }else{
            console.log(data);
            
            alert('로그인 실패 ' + data.message);
          }          


        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  });
});
