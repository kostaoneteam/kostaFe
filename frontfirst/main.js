import { setupInfiniteScroll } from './infiniteScroll.js';
import { setupCheckboxEvents } from './checkboxHandler.js';
import { fetchDataAndRender } from './dataRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded. Initializing...');
    fetchDataAndRender(); // 페이지 로드 시 초기 데이터 로드
    setupInfiniteScroll(); // 무한 스크롤 설정
    setupCheckboxEvents(); // 체크박스 이벤트 설정
});
