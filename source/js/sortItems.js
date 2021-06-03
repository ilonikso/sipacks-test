import  service  from "./service";
import  ui  from "./ui";

const sortItems = () => {
    document.addEventListener('click', (e) => {

        let reverseButton;
    
        if(e.target.classList.contains("item__sort")){
    
            // Show loader and hide items
            ui.showLoader();
            ui.hideShowAllButton();
            ui.clearFoundedNumber();
            ui.hideNoFound();
    
            // Reset sort buttons
            ui.resetSortButtons();
    
            // Check if it is first loading => download all items
            if(ui.isFirstLoading){
                let array = ui.dataArray.result;
                let output;
                
                ui.clearContainer();
                ui.hideShowAllButtonFirstLoad();
    
                // Render Items
                array.forEach((item) => {
                    output += ui.renderItem(item);
                });
    
                // Insert all items to container
                ui.insertContainer(output);
                // Reset Flag
                ui.resetIsFirstLoading();
            } 
    
            // Sort items
            // Find next to target button reverse button
            if(e.target.classList.contains("item__sort--up")){
                reverseButton = e.target.nextElementSibling;
            } else if(e.target.classList.contains("item__sort--down")){
                reverseButton = e.target.previousElementSibling;
            }
    
            // Hide clicked button and show reverse button
            e.target.style.display = 'none';
            reverseButton.style.display = 'block';
            // Highlight active button
            reverseButton.classList.add('item__sort--active');
            
            // Get type of sort from button
            let [column , type] = e.target.getAttribute('data-sort').split('-');
            
            // Get items from table
            let arr = Array.from(document.querySelectorAll(".item-filter"));
            
            // Sort table
            let sorted = service.sortTableData(arr, column, type);
            
            // Clear table
            ui.clearContainer();
            
    
            // Hide loader and show modals
            setTimeout(() => {
                // Render Items
                sorted.forEach(item => {
                    document.querySelector(".ul-container").appendChild(item);
                });
    
                ui.hideLoader();
                ui.showShowAllButton();
    
                // Show first items
                ui.showFirst(22);
                ui.showShowAllButton();
    
            }, 400);
        }
    });
}

export default sortItems;