// const listItems = document.querySelectorAll('li');

// listItems.forEach(item => {
//   const label = item.querySelector('label');
//   const checkbox = item.querySelector('input[type="checkbox"]');

//   label.addEventListener('mouseover', () => {
//     label.classList.add('hover');
//   });

//   label.addEventListener('mouseout', () => {
//     label.classList.remove('hover');
//   });

//   label.addEventListener('click', (event) => {
//     if (event.target === label) {
//       checkbox.checked = !checkbox.checked;
//     }
//   });
// });

// const listItems = document.querySelector('selectevent');

// listItems.forEach(Item => {
//     const label = item.querySelector('selectevent');
//     const checkbox = item.querySelector('input=[type="input_selectevent"]');

//     label.addEventListener('mouseover', () => {
//       label.classList.add('hover');
//     });
  
//     label.addEventListener('mouseout', () => {
//       label.classList.remove('hover');
//     });
  
//        
//   label.addEventListener('click', (event) => {
//       if (event.target === label) {
//         checkbox.checked = !checkbox.checked;
//       }
//     });
//   });


  const listItems = document.querySelectorAll('.selectevent');

listItems.forEach(item => {
  const label = item.querySelector('.accordion_bar');
  const checkbox = item.querySelector('input[type=".checkbox"]');

label.addEventListener('click', (event) => {
    if (event.target === label) {
      checkbox.checked = !checkbox.checked;
    }
  });
});