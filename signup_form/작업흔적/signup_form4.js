document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // 폼 기본 동작 방지
        
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
        
        let check = true;

        // 유효성 검사
        let userIdErrorMsg = document.querySelector('#userid-error-msg');
        if (!userId || userId.length < 3 || userId.length > 15) {
            userIdErrorMsg.style.display = 'block';
            document.getElementById('membership_id').focus();
            check = false;
        } else {
            userIdErrorMsg.style.display = 'none';
        }

        let passwordErrorMsg = document.querySelector('#password-error-msg');
        if (!password || password.length < 4 || password.length > 15) {
            passwordErrorMsg.style.display = 'block';
            document.getElementById('membership_pw').focus();
            check = false;
        } else {
            passwordErrorMsg.style.display = 'none';
        }

        let password2ErrorMsg = document.querySelector('#password2-error-msg');
        if (!passwordConfirm || passwordConfirm.length < 4 || passwordConfirm.length > 15) {
            password2ErrorMsg.style.display = 'block';
            document.getElementById('membership_pw2').focus();
            check = false;
        } else {
            password2ErrorMsg.style.display = 'none';
        }

        if (password !== passwordConfirm) {
            alert('비밀번호와 비밀번호 확인이 다릅니다');
            document.getElementById('membership_pw').focus();
            check = false;
        }

        let userNameErrorMsg = document.querySelector('#name-error-msg');
        const nameRegex = /^[가-힣]+$/;
        if (!userName || !nameRegex.test(userName)) {
            userNameErrorMsg.style.display = 'block';
            document.getElementById('membership_name').focus();
            check = false;
        } else {
            userNameErrorMsg.style.display = 'none';
        }

        let emailErrorMsg = document.querySelector('#email-error-msg');
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
        if (!email || !emailRegex.test(email)) {
            emailErrorMsg.style.display = 'block';
            document.getElementById('membership_email').focus();
            check = false;
        } else {
            emailErrorMsg.style.display = 'none';
        }

        let phoneNumberMsg = document.querySelector('#phone-error-msg');
        if (!phoneNumber) {
            phoneNumberMsg.style.display = 'block';
            document.getElementById('phoneNumber').focus();
            check = false;
        } else {
            phoneNumberMsg.style.display = 'none';
        }

        let imageMsg = document.querySelector('#profileImageError');
        if (!selectedFile) {
            alert('프로필사진 필수등록입니다\n.JFIF, .JPG, .PNG, .GIF 파일형식만 등록해주세요');
            check = false;
        }

        if (!userState) {
            const errorMsg = document.querySelector('#radiomsg');
            errorMsg.style.display = 'block';
            check = false;
        } else {
            const errorMsg = document.querySelector('#radiomsg');
            errorMsg.style.display = 'none';
        }

        if (check) {
            alert('회원가입이 완료되었습니다.');

            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('password', password);
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('profileImage', selectedFile); 
            formData.append('userState', userState.value);

            fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                body: formData,
                console.log(formData)
            })
            
            
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                try {
                    const jsonData = JSON.parse(data);
                    console.log('서버 응답 (JSON):', jsonData);
                } catch (error) {
                    console.log('서버 응답 (텍스트):', data);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
        }
    });
});