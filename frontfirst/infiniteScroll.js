// infiniteScroll.js
import { fetchDataAndRender } from './dataRenderer.js';

export function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            fetchDataAndRender();
        }
    });
}
