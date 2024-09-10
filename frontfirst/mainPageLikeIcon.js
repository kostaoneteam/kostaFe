document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            let count = parseInt(button.dataset.likeCount) || 0;
            count++;
            button.dataset.likeCount = count;

        
            setTimeout(()=> {
                button.innerHTML = `<i class="fa-solid fa-heart"></i> ${count}`;
            }, 1000/2)
            
        });
    });
});

