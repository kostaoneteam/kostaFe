document.addEventListener('DOMContentLoaded', function() {
    // 폼의 submit 이벤트를 처리하는 함수
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 제출의 기본 동작을 방지
        
        // 여기에서 폼 데이터의 유효성 검사 및 추가 작업을 수행합니다.
        // 예를 들어:
        const userId = document.getElementById('membership_id').value;
        const password = document.getElementById('membership_pw').value;
        const passwordConfirm = document.getElementById('membership_pw2').value;
        const userName = document.getElementById('membership_name').value;
        const email = document.getElementById('membership_email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const fileInput = document.getElementById('profileImage'); 
        const selectedFile = fileInput.files[0];
        const userState = document.querySelector('input[name="userState"]:checked');

        // 유효성 검사 및 처리 코드 작성
        let check = true;

    let userIdErrorMsg = document.querySelector('#userid-error-msg');
// 아이디  유효성 검사
    if (!userId || userId.length < 3 || userId.length > 15) {
      userIdErrorMsg.style.display = 'block';
      document.signup.userid.focus();
      check = false;
    //   return;
    } else {
        userIdErrorMsg.style.display = 'none';
    }
    
// 비밀번호1 유효성 검사
    let passwordErrorMsg = document.querySelector('#password-error-msg');

    if (!password || password.length <4 || password.length >15){
        passwordErrorMsg.style.display = 'block';
        document.signup.password1.focus();
        check = false;
    } else {
        passwordErrorMsg.style.display = 'none';
    }

// 비밀번호2 유효성 검사

    let password2ErrorMsg2 = document.querySelector('#password2-error-msg');

    if (!passwordConfirm || passwordConfirm.length <4 || passwordConfirm.length >15){
        password2ErrorMsg2.style.display = 'block';
        document.signup.password2.focus();
        check =false;
    } else {
        password2ErrorMsg2.style.display = 'none';
    }

// 비밀번호1과 비밀번호2 유효성 검사

    if (password !== passwordConfirm){
        alert('비밀번호와 비밀번호 확인이 다릅니다')
        document.signup.password1.focus();
        check = false;
    } else {
        password2ErrorMsg2.style.display = 'none';
    }
// 이름 유효성 감사
    let userNameErrorMsg = document.querySelector('#name-error-msg')
    const name = $('#membership_name').val();
    const nameRegex = /^[가-힣]+$/;
    
    if( !userName || !nameRegex.test(name) ) {
        userNameErrorMsg.style.display = 'block';
        document.signup.userName.focus();
        check = false;
    } else {
        userNameErrorMsg.style.display = 'none';
    }

// 이메일 유효성 감사

    let emailErrorMsg= document.querySelector('#email-error-msg')
    const emailval = $('#membership_email').val();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

    if (!email || !emailRegex.test(emailval)){
        emailErrorMsg.style.display = 'block';
        document.signup.email.focus();
        check = false;
    } else {
        emailErrorMsg.style.display = 'none';
    }
// 전화번호 유효성 검사
    let phoneNumberMsg = document.querySelector('#phone-error-msg')
    
    if (!phoneNumber ) {
        phoneNumberMsg.style.display = 'block';
        document.signup.phoneNumber.focus();
        check =false;
    } else {
        phoneNumberMsg.style.display = 'none';

    }

// 프로필 사진 유효성 검사 
let imageMsg = document.querySelector('profileImageError')
    if (!selectedFile) {
        alert('프로필사진 필수등록입니다\n.JFIF, .JPG, .PNG, .GIF 파일형식만 등록해주세요');
        check= false;
  } 
    
  //판매자 구매자 선택 유효성 검사

  if (userState == null) {
    const errorMsg = document.querySelector('#radiomsg');
  errorMsg.style.display = 'block'; 
  return false; 
} else {
  
  const errorMsg = document.querySelector('#radiomsg');
  errorMsg.style.display = 'none'; 
  check = true; 
}


if(check){  
    alert('회원가입이 완료 되었습니다.')
 }

        
        // 예를 들어, 검증이 완료되면 데이터를 서버로 전송할 수 있습니다.
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('password', password);
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('profileImage', selectedFile);
        formData.append('userState', userState.value);
        
        fetch('http://192.168.0.25:8080/user/signup', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(response => {console.log(response);
        })
        
        .then(data => {
            console.log('서버 응답:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});