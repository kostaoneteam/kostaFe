document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const formData = new FormData(this);
    const data = {
        carModel: formData.get('carModel'),
        brand: formData.get('brand'),
        carType: formData.get('carType'),
        carYear: formData.get('carYear'),
        price: parseInt(formData.get('price')),
        displacement: formData.get('displacement'),
        color: formData.get('color')
    };

    console.log('Form Data:', data); // 폼 데이터 확인
    console.log('JSON Data:', JSON.stringify(data)); // JSON 변환 확인

    fetch(this.action, {
        method: this.method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('작성 완료!');
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});