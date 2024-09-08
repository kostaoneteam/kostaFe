function join() {
    
    // 각 입력 필드의 값 가져오기
    const userId = document.getElementById('membership_id').value;
    const password = document.getElementById('membership_pw').value;
    const passwordConfirm = document.getElementById('membership_pw2').value;
    const userName = document.getElementById('membership_name').value;
    const email = document.getElementById('membership_email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const fileInput = document.getElementById('profileImage'); 
    const selectedFile = fileInput.files[0];
    const userState = document.querySelector('input[name="userState"]:checked');
  
    // 유효성 검사 (예시)

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

 const formData = new FormData();
  formData.append('userId', userId);
  formData.append('password', password);
  formData.append('userName', userName);
  formData.append('email', email);
  formData.append('phoneNumber', phoneNumber);
  formData.append('profileImage', profileImage);
  formData.append('userState', userState);
  console.log(formData)


  const data = {
    userId: userId,
    password: password,
    userName: userName,
    email: email,
    phoneNumber: phoneNumber,
    profileImage: selectedFile,
    userState: userState,
  };
 
 


  fetch('http://192.168.0.25:8080/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // JSON 데이터 전송을 명시
    },
    body: JSON.stringify(data) // 객체를 JSON 문자열로 변환
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('서버 응답:', data);
      // 서버에서 받은 응답 처리 (예: 회원가입 성공/실패 처리)
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

