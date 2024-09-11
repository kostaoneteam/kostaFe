import { updateCheckboxState, fetchDataAndRender, resetOffset } from './dataRenderer.js';

export function setupCheckboxEvents() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // 체크박스 상태 업데이트
            updateCheckboxState(Array.from(checkboxes).some(cb => cb.checked));

            // 체크박스 상태가 변경되면 offset을 리셋하고 필터링된 데이터 요청
            resetOffset();
            fetchFilteredData(); // 필터링된 데이터를 가져옴
        });
    });
}

async function fetchFilteredData() {
    const selectedBrands = Array.from(document.querySelectorAll('.accordion input[data-car-brand]:checked')).map(el => el.dataset.brand);
    const selectedTypes = Array.from(document.querySelectorAll('.accordion input[data-car-type]:checked')).map(el => el.dataset.carType);
    const selectedDisplacements = Array.from(document.querySelectorAll('.accordion input[data-car-displacement]:checked')).map(el => el.dataset.displacement);
    const selectedColors = Array.from(document.querySelectorAll('.accordion input[data-car-color]:checked')).map(el => el.dataset.color);
    const selectedYears = Array.from(document.querySelectorAll('.accordion input[data-car-year]:checked')).map(el => el.dataset.carYear);

    // 쿼리 파라미터로 변환
    const queryParams = new URLSearchParams();

    if (selectedBrands.length) queryParams.append('brand', selectedBrands.join(','));
    if (selectedTypes.length) queryParams.append('carType', selectedTypes.join(','));
    if (selectedDisplacements.length) queryParams.append('displacement', selectedDisplacements.join(','));
    if (selectedColors.length) queryParams.append('color', selectedColors.join(','));
    if (selectedYears.length) queryParams.append('carYear', selectedYears.join(','));

    // GET 요청에 쿼리 파라미터 포함
    const url = `http://localhost:8080/carpost/filter?${queryParams.toString()}`;

    // 필터링된 데이터 요청
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('필터링된 데이터:', data); // 필터된 데이터를 가져왔는지 로그로 확인
            renderData(data); // 데이터를 화면에 렌더링
        } else {
            console.error('데이터 요청 실패:', response.status);
        }
    } catch (error) {
        console.error('필터링된 데이터를 가져오는 중 오류 발생:', error);
    }
}
