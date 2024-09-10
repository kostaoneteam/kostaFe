let offset = 0;
const limit = 30;
const section = document.getElementById('main-section');
let isLoading = false; // 데이터 로딩 중인지 확인하는 플래그
let lastScrollTop = window.scrollY || document.documentElement.scrollTop; // 초기값 설정
const scrollThreshold = 50; // 스크롤 감지를 위한 임계값 (픽셀 단위)

const selectedFilters = {
    brands: [],
    carTypes: [],
    displacements: [],
    colors: [],
    carYears: []
};
let isFilterActive = false;

// 페이지 로드 시 auth.js 로드
document.addEventListener('DOMContentLoaded', () => {
    import('./auth.js')
        .then(module => {
            // auth.js가 로드된 후 필요한 작업을 수행할 수 있음
        })
        .catch(error => {
            console.error('auth.js를 로드하는 중 오류 발생:', error);
        });

    // 체크박스 상태 변경 시 실행되는 이벤트 리스너
    const checkboxes = document.querySelectorAll('.accordion input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            updateSelectedFilters();
            resetAndFetchData();
        });
    });

    // 페이지 로드 시 데이터 로딩
    loadData(limit, offset);
});

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // 스크롤 방향이 바뀌었는지 확인
    if (Math.abs(currentScrollTop - lastScrollTop) > scrollThreshold) {
        // 아래로 스크롤하는 경우만 체크
        if (currentScrollTop > lastScrollTop) {
            // 페이지 맨 아래에 도달했는지 확인
            if (window.innerHeight + currentScrollTop >= document.documentElement.scrollHeight - 100) {
                // 데이터 로딩 중인지 확인하고, 로딩 중이지 않은 경우만 loadData 호출
                if (!isLoading) {
                    isLoading = true; // 로딩 시작
                    loadData(limit, offset).then(() => {
                        isLoading = false; // 로딩 완료
                    }).catch(() => {
                        isLoading = false; // 로딩 실패 시에도 플래그 해제
                    });
                }
            }
        }
        lastScrollTop = currentScrollTop;
    }
});

function updateSelectedFilters() {
    selectedFilters.brands = Array.from(document.querySelectorAll('.accordion input[data-car-brand]:checked'))
                                  .map(cb => cb.dataset.carBrand)
                                  .filter(value => value.trim() !== '');
    selectedFilters.carTypes = Array.from(document.querySelectorAll('.accordion input[data-car-type]:checked'))
                                    .map(cb => cb.dataset.carType)
                                    .filter(value => value.trim() !== '');
    selectedFilters.displacements = Array.from(document.querySelectorAll('.accordion input[data-car-displacement]:checked'))
                                         .map(cb => cb.dataset.carDisplacement)
                                         .filter(value => value.trim() !== '');
    selectedFilters.colors = Array.from(document.querySelectorAll('.accordion input[data-car-color]:checked'))
                                  .map(cb => cb.dataset.carColor)
                                  .filter(value => value.trim() !== '');
    selectedFilters.carYears = Array.from(document.querySelectorAll('.accordion input[data-car-year]:checked'))
                                     .map(cb => cb.dataset.carYear)
                                     .filter(value => value.trim() !== '');

    // 필터 활성화 여부 체크
    isFilterActive = Object.values(selectedFilters).some(arr => arr.length > 0);
}

function fetchFilteredData(limit, offset) {
    const params = new URLSearchParams();

    // 필터 값이 있는 경우만 파라미터에 추가
    if (selectedFilters.brands.length > 0) {
        params.append('brand', selectedFilters.brands.join(','));
    }
    if (selectedFilters.carTypes.length > 0) {
        params.append('carType', selectedFilters.carTypes.join(','));
    }
    if (selectedFilters.displacements.length > 0) {
        params.append('displacement', selectedFilters.displacements.join(','));
    }
    if (selectedFilters.colors.length > 0) {
        params.append('color', selectedFilters.colors.join(','));
    }
    if (selectedFilters.carYears.length > 0) {
        params.append('carYear', selectedFilters.carYears.join(','));
    }

    // limit과 offset은 항상 포함
    params.append('limit', limit);
    params.append('offset', offset);

    const url = isFilterActive
        ? `http://localhost:8080/carpost/filter?${params.toString()}`
        : `http://localhost:8080/carpost/main?limit=${limit}&offset=${offset}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.error('서버 오류:', error);
        return []; // 빈 배열을 반환하여 에러 처리
    });
}

function loadData(limit, offset) {
    return fetchFilteredData(limit, offset)
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
            });

            // 오프셋을 업데이트
            offset += limit;
        })
        .catch(error => {
            console.error('차량 데이터를 가져오는 중 오류 발생:', error);
        });
}

function resetAndFetchData() {
    offset = 0; // 오프셋을 초기화
    section.innerHTML = ''; // 기존 콘텐츠를 제거
    loadData(limit, offset); // 데이터 로드
}
