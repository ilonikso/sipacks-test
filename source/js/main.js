import  service  from "./service";
import  ui  from "./ui";
import filterItems from './filterItems';

const main = () => {
    // Fetch data from server
    fetch("js/data/all.json")
        .then((response) => response.json())
        .then((data) => {
            let array = data;

            // First render (render 20 items to save size)
            ui.renderFirst(array);

            ui.dataArray = array;

            // Change categories listeners
            const catMixed = document.querySelector('.categories--packs').addEventListener('click', ui.renderCategory.bind(null, array, 'Смешанные'));
            const catCommon = document.querySelector('.categories--common').addEventListener('click', ui.renderCategory.bind(null, array, 'Общие вопросы'));
            const catGames = document.querySelector('.categories--games').addEventListener('click', ui.renderCategory.bind(null, array, 'Игры'));
            const catFilms = document.querySelector('.categories--films').addEventListener('click', ui.renderCategory.bind(null, array, 'Кино'));
            const catMusic = document.querySelector('.categories--music').addEventListener('click', ui.renderCategory.bind(null, array, 'Музыка'));
            const catDiff = document.querySelector('.categories--different').addEventListener('click', ui.renderCategory.bind(null, array, 'Разное'));
            const catAllPacks = document.querySelector('.categories--all').addEventListener('click', ui.renderAll.bind(null, array));

            // Fetching all items after first render
            document.querySelector('.item__show-all--first-load').addEventListener('click', ui.showAllFirstLoad.bind(null, array));

            // Filter items function
            filterItems(data);
        });

    // Change URL
    service.changeURL();

    // Show and hide scroll to top button
    ui.controlToTopButton();

    // Scroll to top
    service.scrollTop();

    // Show random item
    document.querySelector('.categories--random').addEventListener('click', ui.renderRandomItem);

    // Show all list items event listener
    document.querySelector('.item__show-all').addEventListener('click', ui.showFirst200);

    // Hide all sort up buttons
    ui.hideSortUpButtons();

};

export default main;