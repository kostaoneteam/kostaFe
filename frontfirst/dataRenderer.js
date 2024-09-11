let isCheckboxActive = false; // 체크박스 상태를 추적하는 변수
let currentOffset = 0; // 현재 offset 값 (초기값은 0)
const limit = 10; // 한 번에 로드할 데이터 수
let isLoading = false; // 데이터 로드 상태를 추적하는 변수
const mainSection = document.getElementById('main-section');

export async function fetchDataAndRender() {
    if (isCheckboxActive || isLoading) {
        // 체크박스가 활성화되거나 데이터 로드 중인 경우, 데이터 로드를 하지 않음
        return;
    }

    isLoading = true; // 데이터 로드 상태를 활성화
    try {

        // 서버로 요청을 보낼 때, offset과 limit을 쿼리 파라미터로 포함
        const response = await fetch(`http://localhost:8080/carpost/main?offset=${currentOffset}&limit=${limit}`);

        if (!response.ok) {
            throw new Error(`${response.status}`); // 응답 상태 코드 로그
        }

        const data = await response.json();
        if (data.length > 0) {
            renderData(data);
            currentOffset += limit; // 다음 페이지를 위해 offset 업데이트
        } else {
            window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 핸들러 제거
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading = false; // 데이터 로드 상태를 비활성화
    }
}

function renderData(data) {
    // 데이터가 없을 때와 있을 때를 구분하여 UI를 업데이트
    if (data.length === 0) {
        const noDataElement = document.createElement('div');
        mainSection.appendChild(noDataElement);
        return;
    }

    data.forEach(item => {
        const carDiv = document.createElement('div');
        carDiv.className = 'car-icons';

        // 차량 이미지 추가
        const carHolder = document.createElement('div');
        carHolder.className = 'car-holder';
        const img = document.createElement('img');
        img.src = item.carImagesURL;
        carHolder.appendChild(img);

        // 차량 상세 정보 추가
        const textDiv = document.createElement('div');
        textDiv.className = 'text';
        const carTitle = document.createElement('div');
        carTitle.className = 'car1';
        carTitle.textContent = item.carModel;
        textDiv.appendChild(carTitle);

        // 차량 상세 정보 테이블 생성
        const table = document.createElement('table');
        table.className = 'car_table';
        const tbody = document.createElement('tbody');

        const details = [
            { label: '브랜드 :', value: item.brand },
            { label: '차 종 :', value: item.carType },
            { label: '연 식 :', value: item.carYear },
            { label: '가 격 :', value: item.price },
            { label: '색 상 :', value: item.color },
            { label: '배 기 량 :', value: item.displacement }
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
        sellerDiv.textContent = `판매자 : ${item.userId}`;
        iconFooter.appendChild(sellerDiv);

        const likeDiv = document.createElement('div');
        likeDiv.className = 'like';
        likeDiv.dataset.likeCount = item.likes;
        likeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${item.likes}`;
        iconFooter.appendChild(likeDiv);

        carDiv.appendChild(carHolder);
        carDiv.appendChild(textDiv);
        carDiv.appendChild(iconFooter);

        mainSection.appendChild(carDiv);
    });
}

// 스크롤 이벤트 핸들러
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        fetchDataAndRender();
    }
}

// 페이지 로드시 스크롤 이벤트 핸들러 추가
window.addEventListener('scroll', handleScroll);

// 체크박스 상태 업데이트 함수
export function updateCheckboxState(isActive) {
    isCheckboxActive = isActive;
    if (isCheckboxActive) {
        window.removeEventListener('scroll', handleScroll); // 체크박스가 활성화되면 스크롤 이벤트 핸들러 제거
    } else {
        window.addEventListener('scroll', handleScroll); // 체크박스가 비활성화되면 스크롤 이벤트 핸들러 추가
    }
}

// Offset 값 초기화 함수
export function resetOffset() {
    currentOffset = 0; // offset을 0으로 초기화
}
