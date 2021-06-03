import  ui  from "./ui";

const filterItems = (data) => {
    ui.inputForm.addEventListener('submit', (e) => {
        
        e.preventDefault();

        // Check if firstLoading - render all and find items
        if(ui.isFirstLoading){
            // Hide button and show all items
            ui.showAll();

            ui.clearContainer();
            ui.hideShowAllButtonFirstLoad();
            
            ui.showLoader();
            // Show loader and hide container
            ui.clearFoundedNumber();
            ui.hideContainer();
            ui.hideNoFound();

            ui.renderAll(data);
            
            
            // Reset Flag
            ui.resetIsFirstLoading();

            // Hide loader and show items after filtering
            setTimeout(() => {
            
                const text = ui.inputField.value.toLowerCase();
                const items = document.querySelectorAll('.item-filter');
                let counter = 0;
                    
                // Filter Items
                items.forEach(function(task){
                    
                    const item = task.firstChild.nextSibling.textContent;
                    const author = task.firstChild.nextSibling.nextSibling.nextSibling.textContent;
                    const date = task.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
            
                        if(item.toLowerCase().indexOf(text) !== -1 || author.toLowerCase().indexOf(text) !== -1 || date.toLowerCase().indexOf(text) !== -1) {
                            task.style.display = 'grid';
                            counter++;
                        } else {
                            task.style.display = 'none';
                        }
                });

                ui.hideShowAllButton();
                ui.hideShowAllButtonFirstLoad();
                
        
                ui.hideLoader();
                ui.showContainer();
                
                ui.setFoundedNumber(counter);
                ui.inputField.value = '';
        
                // Show blocks (No result find)
                if(counter === 0){
                    ui.showNoFound();
                    ui.setFoundedText(text);
                } else {
                    ui.hideNoFound();
                    ui.clearFoundedText();
                }
        
                // Clear find number field if search field is empty
                if(counter === items.length){
                    ui.clearFoundedNumber();
                }
        
            }, 700);

        } else {
            // Hide button and show all items
            ui.showAll();
            
            // Show loader and hide container    
            ui.clearContainer();
            
            ui.clearFoundedNumber();
            ui.showLoader();
            ui.hideContainer();
            ui.hideNoFound();
            ui.resetSortButtons();
            ui.clearCategoryButtons();
            document.querySelector('.categories__button').classList.add('categories__button--active');

            ui.renderAll(data);
        
            // Hide loader and show items after filtering
            setTimeout(() => {
                const text = ui.inputField.value.toLowerCase();
                const items = document.querySelectorAll('.item-filter');
                let counter = 0;

                // Filter Items
                items.forEach(function(task){
                    
                    const item = task.firstChild.nextSibling.textContent;
                    const author = task.firstChild.nextSibling.nextSibling.nextSibling.textContent;
                    const date = task.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
            
                        if(item.toLowerCase().indexOf(text) !== -1 || author.toLowerCase().indexOf(text) !== -1 || date.toLowerCase().indexOf(text) !== -1) {
                            task.style.display = 'grid';
                            counter++;
                        } else {
                            task.style.display = 'none';
                        }
                });
                
                ui.hideShowAllButton();
                ui.hideShowAllButtonFirstLoad();
                ui.setFoundedNumber(counter);
                ui.showContainer();
                ui.inputField.value = '';
                ui.hideLoader();
        
                // Show blocks (No result find)
                if(counter === 0){
                    ui.showNoFound();
                    ui.setFoundedText(text);
                } else {
                    ui.hideNoFound();
                    ui.clearFoundedText();
                }
        
                // Clear find number field if search field is empty
                if(counter === items.length){
                    ui.clearFoundedNumber();
                }
        
            }, 700);

        }
    });
}

export default filterItems;