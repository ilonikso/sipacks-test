import  service  from "./service";

class UI {
    constructor() {
        this.container = document.querySelector(".ul-container");
        this.categoryButtons = Array.from(
            document.querySelectorAll(".categories__button")
        );
        this.loader = document.querySelector(".loader");
        this.showAllButton = document.querySelector(".item__show-all");
        this.showAllButtonFirstLoad = document.querySelector(
            ".item__show-all--first-load"
        );
        this.foundedNumber = document.querySelector(".founded-number");
        this.noFoundBlock = document.querySelector(".no-found");
        this.noFoundBlockText = document.querySelector(".no-found-text");
        this.inputField = document.querySelector(".form__input");
        this.inputForm = document.querySelector(".form__item");
        this.toTopButton = document.querySelector(".to-top-button");
        this.isFirstLoading;
        this.dataArray
    }

    insertContainer(items) {
        this.container.innerHTML = items;
    }

    clearContainer() {
        this.container.innerHTML = "";
    }

    showContainer() {
        this.container.style.display = "block";
    }

    hideContainer() {
        this.container.style.display = "none";
    }

    clearInput() {
        this.inputField.value = "";
    }

    getDifficultyStyle(diff) {
        if(!diff) return '' ;
        if (diff < 3) return 'sheet__diff--lite';
        if (diff >= 3 && diff <= 7) return 'sheet__diff--medium';
        if (diff > 7) return 'sheet__diff--hard';
    }

    getLikesStyle(likes) {
        if(!likes) return '--default' ;
        if(likes) return '';
    }

    showFirst(number) {
        document
            .querySelectorAll(".item-filter")
            .forEach(function (item, index) {
                if (index <= number - 1) {
                    item.style.display = "grid";
                } else {
                    item.style.display = "none";
                }
            });
    }

    showFirst200() {
        document.querySelector(".item__show-all").style.display = "none";

        document
            .querySelectorAll(".item-filter")
            .forEach(function (item, index) {
                if (index <= 250 - 1) {
                    item.style.display = "grid";
                } else {
                    item.style.display = "none";
                }
            });
    }

    showAll() {
        document.querySelector(".item__show-all").style.display = "none";

        document.querySelectorAll(".item-filter").forEach(function (item) {
            item.style.display = "grid";
        });
    }

    showAllFirstLoad(data) {
        ui.hideShowAllButtonFirstLoad();

        let promise = new Promise((resolve, reject) => {
            let outputArray = [];
            let output = "";

            // Show loader and hide items
            ui.showLoader();
            ui.hideShowAllButton();
            ui.hideShowAllButtonFirstLoad();
            ui.clearFoundedNumber();

            // Clear container
            ui.clearContainer();

            outputArray = data.result;

            // Sort array by date
            let sortedArr = service.sortData(outputArray, 4, "down");

            // Render Items
            sortedArr.forEach((item) => {
                output += ui.renderItem(item);
            });

            // Hide loader and show modals
            setTimeout(() => {
                ui.insertContainer(output);
                ui.hideLoader();


                // Define all outside links
                service.defineOutsideLinks();

                resolve("promise resolved");
            }, 100);
        });

        promise
            .then(() => {
                ui.showFirst(300);
                // ui.showAll();
            })
            .then(() => {
                ui.resetIsFirstLoading();
            });
    }

    clearCategoryButtons() {
        this.categoryButtons.forEach((item) => {
            if (item.classList.contains("categories__button--active")) {
                item.classList.remove("categories__button--active");
            }
        });
    }

    setIsFirstLoading(){
        return this.isFirstLoading = true;
    }

    resetIsFirstLoading() {
        return this.isFirstLoading = false;
    }

    showLoader() {
        this.loader.style.display = "block";
    }

    hideLoader() {
        this.loader.style.display = "none";
    }

    setFoundedNumber(text) {
        this.foundedNumber.textContent = `(${text})`;
    }

    clearFoundedNumber() {
        this.foundedNumber.textContent = "";
    }

    setFoundedText(text) {
        this.noFoundBlockText.textContent = `"${text}"`;
    }

    clearFoundedText() {
        this.noFoundBlockText.textContent = "";
    }

    showNoFound() {
        this.noFoundBlock.style.display = "block";
    }

    hideNoFound() {
        this.noFoundBlock.style.display = "none";
    }

    showShowAllButton() {
        this.showAllButton.style.display = "block";
    }

    hideShowAllButton() {
        this.showAllButton.style.display = "none";
    }

    showShowAllButtonFirstLoad() {
        this.showAllButtonFirstLoad.style.display = "block";
    }

    hideShowAllButtonFirstLoad() {
        this.showAllButtonFirstLoad.style.display = "none";
    }

    renderItem(item) {
        let itemHTML = `
        <li class="item item-filter sheet__row">
            <div class="item__data item__group sheet__group">
                <span class="item__name sheet__name" title="Название пакета">${
                    item[0]
                }</span>
                <span class="item__author sheet__author" title="Автор пакета">${
                    (item[1] === "" || !item[1]) ? "Неизвестный автор" : item[1]
                }</span>
            </div>

            <span class="item__data item__date sheet__date" title="Дата создания">${
                service.formatTime((item[4] + "").split("T20")[0])
            }</span>

            <span class="item__data item__diff sheet__diff ${ui.getDifficultyStyle(item[5])}">
                <span title="Сложность" class="item__diff-badge sheet__badge">${
                    (item[5] === "" || !item[5]) ? "-" : item[5]
                }</span>
            </span>

            <span class="item__data item__likes sheet__likes">
                <span title="Количество оценок" class="item__likes-badge sheet__badge">${
                    item[7] === "" || item[7] === null ? "0" : item[7]
                }</span>
            </span>

            <span class="item__data item__size sheet__size" title="Размер файла">${
                service.formatSize(item[8])
            }</span>

            <a href="https://vk.com/topic-135725718_34975471?post=${
                item[9]
            }" class="item__data item__like sheet__like button" rel="noopener" target="_blank" title="Оценить пакет">Оценить пакет</a>

            <div class="item__data item__questions sheet__questions" title="Показать список вопросов">
                <button type="button" class="dropdown-toggle dropdown-toggle-questions button item__questions-button">Темы</button>
                <div class="dropdown-menu">
                    <img data-img="${
                        item[2]
                    }" src="" alt="Изображение недоступно">
                    <div class="outside-link">
                        <span>Автор пакета разместил список тем на стороннем ресурсе</span>
                        <a href="#" class="button" rel="noopener" target="_blank">Перейти</a>
                    </div>
                </div>
            </div>

            <a href="${
                item[3]
            }" class="item__data item__download button sheet__download" rel="noopener" target="_blank" title="Скачать">Скачать</a>

            <div class="item__data item__more sheet__more" title="Другое">
                <button type="button" class="dropdown-toggle dropdown-toggle-complaints sheet__more-button">Больше возможностей</button>
                <div class="dropdown-content sheet__more-drop">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScgwuggQ3Hsl1OfJXO9NRLSbgKZKsEa3mcuz_duDwLEsHXEBw/viewform?usp=pp_url&entry.1513800268=${item[0]}&entry.838444523=${item[1]}" class="sheet__more-link js-open-modal" data-modal="2" data-package="Название пакета" data-author="Автор" rel="noopener" target="_blank">Пожаловаться</a>
                </div>
            </div>
        </li>
            `;

        return itemHTML;
    }

    renderItems(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // show loader and hide show all button
                ui.showLoader();
                ui.hideShowAllButton();
                ui.clearFoundedNumber();

                // Clear container
                ui.clearContainer();

                let output = "";
                let items = data.result;

                // Sort data by date
                let sortedArr = service.sortData(items, 4, "down");

                // Render Items
                sortedArr.forEach((item) => {
                    output += ui.renderItem(item);
                });

                // Hide loader and show modals
                setTimeout(() => {
                    ui.insertContainer(output);
                    ui.hideLoader();
                    ui.showShowAllButton();

                    // Show first items
                    ui.showFirst(22);

                    // Define all outside links
                    service.defineOutsideLinks();
                }, 500);
            });
    }

    renderAll(data) {
        let outputArray = [];
        let output = "";

        // Show loader and hide items
        ui.showLoader();
        ui.hideShowAllButton();
        ui.hideShowAllButtonFirstLoad();
        ui.clearFoundedNumber();
        ui.hideNoFound();

        // Clear container
        ui.clearContainer();

        outputArray = data.result;

        // Sort array by date
        let sortedArr = service.sortData(outputArray, 4, "down");

        // Render Items
        sortedArr.forEach((item) => {
            output += ui.renderItem(item);
        });

        // Hide loader and show modals
        setTimeout(() => {
            ui.insertContainer(output);
            ui.hideLoader();
            ui.showShowAllButton();

            // Show first items
            ui.showFirst(22);

            // Define all outside links
            service.defineOutsideLinks();
        }, 500);
    }

    renderFirst(data) {
        let outputArray = [];
        let firstLoadedArray = [];
        let output = "";

        // Show loader and hide items
        ui.showLoader();
        ui.hideShowAllButton();
        ui.hideShowAllButtonFirstLoad();
        ui.clearFoundedNumber();
        ui.setIsFirstLoading();

        // Clear container
        ui.clearContainer();

        outputArray = data.result;

        // Sort array by date
        let sortedArr = service.sortData(outputArray, 4, "down");

        for (let i = 0; i <= 22; i++) {
            firstLoadedArray.push(sortedArr[i]);
        }

        // Render Items
        firstLoadedArray.forEach((item) => {
            output += ui.renderItem(item);
        });

        // Hide loader and show modals
        setTimeout(() => {
            ui.insertContainer(output);
            ui.hideLoader();

            // showRenderAll button
            ui.showShowAllButtonFirstLoad();

            // // Show first items
            // ui.showFirst(22);

            // Define all outside links
            service.defineOutsideLinks();
        }, 500);
    }

    renderCategory(data, name) {
        let output = "";

        // Show loader and hide items
        ui.showLoader();
        ui.hideShowAllButton();
        ui.hideShowAllButtonFirstLoad();
        ui.clearFoundedNumber();
        ui.hideNoFound();
        ui.resetIsFirstLoading();

        // Reset sort buttons
        ui.resetSortButtons();

        // Clear container
        ui.clearContainer();

        // Search categories
        let outputArray = [];

        data.result.forEach((item) => {
            if (item[6] === name) {
                outputArray.push(item);
            }
        });

        // Sort array by date
        let sortedArr = service.sortData(outputArray, 4, "down");

        // Render Items
        sortedArr.forEach((item) => {
            output += ui.renderItem(item);
        });

        // Hide loader and show modals
        setTimeout(() => {
            ui.insertContainer(output);
            ui.hideLoader();
            ui.showShowAllButton();

            // Show first items
            ui.showFirst(22);

            // Define all outside links
            service.defineOutsideLinks();
        }, 500);
    }

    renderRandomItem() {
        // Hide container and show loader
        ui.hideShowAllButton();
        ui.hideShowAllButtonFirstLoad();
        ui.hideNoFound();
        ui.showLoader();
        ui.clearFoundedNumber();

        // Reset sort buttons
        ui.resetSortButtons();

        const items = document.querySelectorAll("ul .item-filter");

        // Hide all items
        items.forEach((item) => (item.style.display = "none"));

        setTimeout(() => {
            // Get random item
            const randomItem = service.getRandom(1, items.length);

            // Show random item
            items.forEach((item, index) => {
                if (index === randomItem) {
                    item.style.display = "grid";
                }
            });

            // Hide loader
            ui.hideLoader();
        }, 500);
    }

    controlToTopButton() {
        window.addEventListener("scroll", () => {
            const topShowBorder = 250;
            const scrollY = window.scrollY;
            const button = document.querySelector(".to-top-button");

            if (scrollY > topShowBorder) {
                button.classList.add("to-top-button-active");
            } else {
                button.classList.remove("to-top-button-active");
            }
        });
    }

    hideSortUpButtons() {
        document
            .querySelectorAll(".item__sort--up")
            .forEach((item) => (item.style.display = "none"));
    }

    showSortDownButtons() {
        document
            .querySelectorAll(".item__sort--down")
            .forEach((item) => (item.style.display = "block"));
    }

    clearActiveSortButton() {
        document
            .querySelectorAll(".item__sort")
            .forEach((item) => item.classList.remove("item__sort--active"));
    }

    resetSortButtons() {
        // Hide all sort up button
        ui.hideSortUpButtons();
        // Show all sort down button
        ui.showSortDownButtons();
        // Clear all active buttons
        ui.clearActiveSortButton();
    }
}

const ui = new UI();

export default ui;
