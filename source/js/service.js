class Service {
    constructor() {}

    changeURL() {
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("dropdown-toggle-questions")) {
                // Define UI blocks
                const image = e.target.nextSibling.nextSibling.firstChild.nextSibling;
                const link = e.target.nextSibling.nextSibling.firstChild.nextSibling.getAttribute("data-img");
                const message = e.target.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;
                const messageLink = message.firstChild.nextSibling.nextSibling.nextSibling;

                // Create regular exp
                const re = /(prntscr)\W+/g;

                // Check if link match to regExp
                if (re.test(link) === true) {
                    image.style.display = "none";
                    messageLink.setAttribute("href", link);
                    message.style.display = "block";
                } else {
                    image.setAttribute("src", link);
                }
            }
        });
    }

    defineOutsideLinks() {
        const buttons = Array.from(
            document.querySelectorAll(".dropdown-toggle-questions")
        );
        // Create regular exp
        const re = /(prntscr.com)\W+/g;
        let link;

        buttons.forEach((item, index) => {
            // Get image link
            link = item.nextSibling.nextSibling.firstChild.nextSibling.getAttribute("data-img");

            // If image is outside - add icon class to button
            link.search(re) !== -1
                ? item.classList.add("outside-button")
                : false;
        });
    }

    // Sort data from tables
    // --- Columns:
    // --- 0 - Name
    // --- 1 - Author
    // --- 4 - Date 
    // --- 5 - Difficulty
    // --- 6 - Size

    sortData(data, column = 4, direction = "down") {
        let arr = data;

        if (direction === "down") {
            arr.sort((a, b) => (b[column] > a[column] ? 1 : -1));
        } else if (direction === "up") {
            arr.sort((a, b) => (b[column] > a[column] ? -1 : 1));
        }

        return arr;
    }

    getRandom(min = 0, max = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    scrollTop() {
        document.querySelector(".to-top-button").addEventListener("click", (e) => {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    sortTableData(data, column = 'name', direction = 'down'){
        let arr = data;
        let sorted;
        
        // Sort function
        sorted = arr.sort((a, b) => {
            let aItem, bItem;

            // Define compare items
            if(column === 'name'){
                aItem = a.firstElementChild.firstElementChild.textContent;
                bItem = b.firstElementChild.firstElementChild.textContent;

            } else if (column === 'author'){
                aItem = a.firstElementChild.firstElementChild.nextElementSibling.textContent;
                bItem = b.firstElementChild.firstElementChild.nextElementSibling.textContent;

            } else if (column === 'difficulty') {
                aItem = a.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.textContent;
                bItem = b.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.textContent;

            } else if (column === 'date'){
                aItem = service.formatTimeToString(a.firstChild.nextElementSibling.nextElementSibling.textContent);
                bItem = service.formatTimeToString(b.firstChild.nextElementSibling.nextElementSibling.textContent);
                
            } else if (column === 'likes'){
                aItem = a.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.textContent;
                bItem = b.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.textContent;

            } else if (column === 'size'){
                aItem = service.formatSizeToBytes(a.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent).toString();
                bItem = service.formatSizeToBytes(b.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent).toString();

            }
            
            // Define sort direction
            if(direction === 'up'){
                return aItem.localeCompare(bItem, "ru", {numeric: true});
            } else{
                return (-1) * aItem.localeCompare(bItem, "en", {numeric: true});
            }           
        });

        return sorted;
    }

    formatTime(date){
        if(date !== ''){
            const time = new Date(date);

            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();

            if(day < 10) {
                day = '0' + day;
            } 

            if(month < 10) {
                month = '0' + month;
            } 

            return `${day}.${month}.${year}`;
        } else {
            return '';
        }
    }

    formatTimeToString(date){
        let data = date.split('.');

        return `${data[2]}-${data[1]}-${data[0]}`;
    }

    formatSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        if (bytes === null || bytes === undefined) return '-';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'КБ', 'МБ', 'ГБ'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    formatSizeToBytes(str) {
        if(str === '-') return 0;

        const k = 1024;
        const sizes = ['Bytes', 'КБ', 'МБ', 'ГБ'];

        let i = sizes.indexOf(str.split(' ')[1]);
        let num = str.split(' ')[0];

        let bytes = Math.floor((Math.pow(k, i) * num));

        return bytes;
    }
}

const service = new Service();

export default service;
