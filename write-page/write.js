// 데이터 로딩 함수
const loadData = () => {
    const baseURL = isFilterActive
        ? `http://localhost:8080/carpost/filter?limit=${limit}&offset=${offset}`
        : `http://localhost:8080/carpost/main?limit=${limit}&offset=${offset}`;

    return fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            // 데이터를 페이지에 추가
            data.forEach(car => {
                const carDiv = document.createElement('div');
                carDiv.className = 'car-icons';

                // 차량 이미지 추가
                const carHolder = document.createElement('div');
                carHolder.className = 'car-holder';
                const img = document.createElement('img');
                img.src = car.carImagesURL; // 차량 객체에 imageURL 속성이 있다고 가정
                carHolder.appendChild(img);

                // 차량 상세 정보 추가
                const textDiv = document.createElement('div');
                textDiv.className = 'text';
                const carTitle = document.createElement('div');
                carTitle.className = 'car1';
                carTitle.textContent = car.title; // 차량 객체에 title 속성이 있다고 가정
                textDiv.appendChild(carTitle);

                // 차량 상세 정보 테이블 생성
                const table = document.createElement('table');
                table.className = 'car_table';
                const tbody = document.createElement('tbody');

                const details = [
                    { label: '차 종 :', value: car.carType },
                    { label: '연 식 :', value: car.carYear },
                    { label: '가 격 :', value: car.price },
                    { label: '총 km 수 :', value: car.mileage },
                    { label: '배 기 량 :', value: car.displacement }
                ];

                details.forEach(detail => {
                    const tr = document.createElement('tr');
                    const tdLabel = document.createElement('td');
                    tdLabel.textContent = detail.label;
                    const tdValue = document.createElement('td');
                    const spanValue = document.createElement('span');
                    spanValue.textContent = detail.value;
                    tdValue.appendChild(spanValue);
                    tr.appendChild(tdLabel);
                    tr.appendChild(tdValue);
                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
                textDiv.appendChild(table);

                // 좋아요 아이콘 추가
                const iconFooter = document.createElement('div');
                iconFooter.className = 'icon-footer';
                const sellerDiv = document.createElement('div');
                sellerDiv.textContent = `판매자 : ${car.userId}`; // 차량 객체에 seller 속성이 있다고 가정
                iconFooter.appendChild(sellerDiv);

                const likeDiv = document.createElement('div');
                likeDiv.className = 'like';
                likeDiv.dataset.likeCount = car.likes; // 차량 객체에 likes 속성이 있다고 가정
                likeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${car.likes}`;
                iconFooter.appendChild(likeDiv);

                carDiv.appendChild(carHolder);
                carDiv.appendChild(textDiv);
                carDiv.appendChild(iconFooter);

                section.appendChild(carDiv);

                // 클릭 시 상세 페이지로 이동
                carDiv.addEventListener('click', () => {
                    fetch(`http://localhost:8080/carpost/details/${car.id}`)
                        .then(response => response.json())
                        .then(carDetails => {
                            // 상세 정보를 로드한 후, 상세 페이지로 리다이렉트
                            const detailURL = new URL('http://localhost:63342/kostaFe/detail-page/detail.html');
                            detailURL.searchParams.set('id', car.id);
                            window.location.href = detailURL.href;
                        })
                        .catch(error => {
                            console.error('차량 상세 정보를 가져오는 중 오류 발생:', error);
                        });
                });
            });

            // 오프셋을 업데이트
            offset += limit;
        })
        .catch(error => {
            console.error('차량 데이터를 가져오는 중 오류 발생:', error);
        });
};
