document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.accordion input[type="checkbox"]');
    const selectedFilters = {
        brands: [],
        carTypes: [],
        displacements: [],
        colors: [],
        carYear: []
    };
    let isFilterActive = false;

    // 체크박스 상태 변경 시 실행되는 이벤트 리스너
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            updateSelectedFilters();
            resetAndFetchData();
        });
    });

    function updateSelectedFilters() {
        selectedFilters.brands = Array.from(document.querySelectorAll('.accordion input[data-car-brand]:checked'))
                                      .map(cb => cb.dataset.carBrand)
                                      .filter(value => value.trim() !== '');
        selectedFilters.carTypes = Array.from(document.querySelectorAll('.accordion input[data-car-Typeld]:checked'))
                                        .map(cb => cb.dataset.carTypeld)
                                        .filter(value => value.trim() !== '');
        selectedFilters.displacements = Array.from(document.querySelectorAll('.accordion input[data-car-displacement]:checked'))
                                             .map(cb => cb.dataset.carDisplacement)
                                             .filter(value => value.trim() !== '');
        selectedFilters.colors = Array.from(document.querySelectorAll('.accordion input[data-car-color]:checked'))
                                      .map(cb => cb.dataset.carColor)
                                      .filter(value => value.trim() !== '');
        selectedFilters.carYear = Array.from(document.querySelectorAll('.accordion input[data-car-Year]:checked'))
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
        if (selectedFilters.carYear.length > 0) {
            params.append('carYear', selectedFilters.carYear.join(','));
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
                // 데이터가 있을 경우 페이지에 추가
                const section = document.querySelector('#main-section');
                data.forEach(car => {
                    // ... (기존의 차량 데이터 표시 로직)
                });

                // 오프셋을 업데이트
                offset += limit;
            });
    }

    // 무한 스크롤 구현
    let offset = 0;
    const limit = 30;
    let isLoading = false;

    function resetAndFetchData() {
        offset = 0; // 오프셋을 초기화
        document.querySelector('#main-section').innerHTML = ''; // 기존 콘텐츠를 제거
        loadData(limit, offset); // 데이터 로드
    }

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            if (!isLoading && (isFilterActive || offset === 0)) {
                isLoading = true;
                loadData(limit, offset).then(() => {
                    isLoading = false;
                });
            }
        }
    });

    // 초기 데이터 로드
    loadData(limit, offset);
});