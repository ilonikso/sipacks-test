import ui from "./ui";

const categoriesButtonInit = () => {
    // Switch active categories button
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("categories__button")) {
            // Reset all buttons
            ui.clearCategoryButtons();
            // Highlight active button
            e.target.classList.add("categories__button--active");
        }
    });
};

export default categoriesButtonInit;
