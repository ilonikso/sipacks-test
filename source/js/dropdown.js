const dropdownToggle = () => {
    // Array to save opened question blocks
    let openedItems = [];
    let openedComplaints = [];

    // Open block by clicking
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-toggle-questions")) {
            const dropdownToggle = e.target;

            if (dropdownToggle.classList.contains("active")) {
                dropdownToggle.classList.remove("active");
                openedItems.pop();

                return false;
            } else {
                openedItems.push(dropdownToggle);
                dropdownToggle.classList.add("active");
            }

            console.log(openedItems)

            openedItems.forEach((item, index) => {
                if (item === dropdownToggle) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                    openedItems.splice(index, 1);
                }
            });
        } else{
            // If user click outside of question block -> close all opened items
            openedItems.forEach((item, index) => {
                    item.classList.remove("active");
                    openedItems.splice(index, 1);
            });
        }

        if (e.target.classList.contains("dropdown-toggle-complaints")) {
            let dropdownToggle = e.target;

            if (dropdownToggle.classList.contains("active")) {
                dropdownToggle.classList.remove("active");
                openedComplaints.pop();

                return false;
            } else {
                openedComplaints.push(dropdownToggle);
                dropdownToggle.classList.add("active");
            }

            openedComplaints.forEach((item, index) => {
                if (item === dropdownToggle) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                    openedComplaints.splice(index, 1);
                }
            });
        } else{
            // If user click outside of item -> close opened item
            openedComplaints.forEach((item, index) => {
                item.classList.remove("active");
                openedComplaints.splice(index, 1);
            });
        }
    });
};

export default dropdownToggle;
