

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 제출의 기본 동작을 방지
        
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

        let password2ErrorMsg2 = document.querySelector('#password2-error-msg');
        if (!passwordConfirm || passwordConfirm.length < 4 || passwordConfirm.length > 15) {
            password2ErrorMsg2.style.display = 'block';
            document.getElementById('membership_pw2').focus();
            check = false;
        } else {
            password2ErrorMsg2.style.display = 'none';
        }

        if (password !== passwordConfirm) {
            alert('비밀번호와 비밀번호 확인이 다릅니다');
            document.getElementById('membership_pw').focus();
            check = false;
        } else {
            password2ErrorMsg2.style.display = 'none';
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
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
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

        if (userState == null) {
            const errorMsg = document.querySelector('#radiomsg');
            errorMsg.style.display = 'block'; 
            check = false; 
        } else {
            const errorMsg = document.querySelector('#radiomsg');
            errorMsg.style.display = 'none'; 
        }
      


        console.log(selectedFile);
        
        if (check) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('password', password);
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('userImagesURL', selectedFile);
            formData.append('userState', userState.value);
            
            fetch('http://192.168.0.25:8080/user/signup', {
                method: 'POST',
                headers: {
    
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log('서버 응답:', data);
              
                if (data.userId) { 
                    alert(`회원가입이 완료 되었습니다.\n 아이디 : ${userId}`);
                    // window.location.href = 'http://127.0.0.1:5500/login_form/login_form.html';
                } else {
                    alert('회원가입 실패: ' + data.message);
                }
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});