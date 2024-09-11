import {fetchDataAndRender} from "./dataRenderer";

document.querySelectorAll('.accordion input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        if (checkbox.checked) {
            // 체크박스가 체크되었을 때
            fetchDataBasedOnCheckboxes(); // 체크박스 상태에 따라 데이터 가져오기
        }
    });
});

function fetchDataBasedOnCheckboxes() {
    const selectedBrands = Array.from(document.querySelectorAll('.brand input:checked')).map(cb => cb.dataset.brand);
    const selectedTypes = Array.from(document.querySelectorAll('.carType input:checked')).map(cb => cb.dataset.carType);
    const selectedDisplacements = Array.from(document.querySelectorAll('.displacement input:checked')).map(cb => cb.dataset.displacement);
    const selectedColors = Array.from(document.querySelectorAll('.color input:checked')).map(cb => cb.dataset.color);
    const selectedYears = Array.from(document.querySelectorAll('.carYear input:checked')).map(cb => cb.dataset.carYear);

    // 데이터 가져오기 로직
    fetchDataAndRender(0, 10, selectedBrands, selectedTypes, selectedDisplacements, selectedColors, selectedYears);
}
