document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#carForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // 기본 폼 제출 방지

        // 이미지 파일 처리
        const imageInput = document.getElementById('images');
        const files = imageInput.files;
        const base64Images = [];

        // 모든 파일을 Base64로 인코딩
        for (const file of files) {
            const reader = new FileReader();
            const base64Promise = new Promise((resolve, reject) => {
                reader.onload = () => {
                    let base64Image = reader.result;  // data:image/jpeg;base64,... 형식 포함
                    resolve(base64Image);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file); // Base64로 변환
            });
            base64Images.push(await base64Promise);
        }

        // LocalStorage에서 userId 가져오기
        const userId = localStorage.getItem('userId');

        // 폼 데이터 수집
        const formData = {
            carModel: document.querySelector('#carModel').value,
            brand: document.querySelector('#brand').value,
            carType: document.querySelector('#carType').value,
            carYear: document.querySelector('#carYear').value,
            price: parseInt(document.querySelector('#price').value, 10),
            displacement: document.querySelector('#displacement').value,
            color: document.querySelector('#color').value,
            carImagesURL: base64Images, // Base64로 인코딩된 이미지 리스트 (data:image/jpeg;base64, 형식 포함)
            userId: userId // userId 추가
        };

        console.log('폼 데이터:', formData);

        try {
            const response = await fetch('http://localhost:8080/carpost/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(formData)
            });
9

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json();
            console.log('성공:', result);

            // 리디렉트
            window.location.href = 'http://localhost:63342/kostaFe/frontfirst/frontfirst2.html'; // 메인 페이지로 리다이렉트
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});