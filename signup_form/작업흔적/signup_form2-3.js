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

    // 유효성 검사
    let check = true;

    let userIdErrorMsg = document.querySelector('#userid-error-msg');
    if (!userId || userId.length < 3 || userId.length > 15) {
        userIdErrorMsg.style.display = 'block';
        check = false;
    } else {
        userIdErrorMsg.style.display = 'none';
    }

    let passwordErrorMsg = document.querySelector('#password-error-msg');
    if (!password || password.length < 4 || password.length > 15) {
        passwordErrorMsg.style.display = 'block';
        check = false;
    } else {
        passwordErrorMsg.style.display = 'none';
    }

    let password2ErrorMsg2 = document.querySelector('#password2-error-msg');
    if (!passwordConfirm || passwordConfirm.length < 4 || passwordConfirm.length > 15) {
        password2ErrorMsg2.style.display = 'block';
        check = false;
    } else if (password !== passwordConfirm) {
        alert('비밀번호와 비밀번호 확인이 다릅니다');
        check = false;
    } else {
        password2ErrorMsg2.style.display = 'none';
    }

    let userNameErrorMsg = document.querySelector('#name-error-msg');
    const nameRegex = /^[가-힣]+$/;
    if (!userName || !nameRegex.test(userName)) {
        userNameErrorMsg.style.display = 'block';
        check = false;
    } else {
        userNameErrorMsg.style.display = 'none';
    }

    let emailErrorMsg = document.querySelector('#email-error-msg');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    if (!email || !emailRegex.test(email)) {
        emailErrorMsg.style.display = 'block';
        check = false;
    } else {
        emailErrorMsg.style.display = 'none';
    }

    let phoneNumberMsg = document.querySelector('#phone-error-msg');
    if (!phoneNumber) {
        phoneNumberMsg.style.display = 'block';
        check = false;
    } else {
        phoneNumberMsg.style.display = 'none';
    }

    if (!selectedFile) {
        alert('프로필사진 필수등록입니다\n.JFIF, .JPG, .PNG, .GIF 파일형식만 등록해주세요');
        check = false;
    }

    if (userState === null) {
        const errorMsg = document.querySelector('#radiomsg');
        errorMsg.style.display = 'block';
        check = false;
    } else {
        const errorMsg = document.querySelector('#radiomsg');
        errorMsg.style.display = 'none';
    }

    if (check) {
        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('password', password);
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('profileImage', selectedFile); 
        formData.append('userState', userState.value);

        // 백엔드로 PATCH 요청 보내기
        fetch('http://localhost:8080/user/update', {
            method: 'PATCH',
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status); // 응답 상태 코드 확인
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('서버 응답:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}