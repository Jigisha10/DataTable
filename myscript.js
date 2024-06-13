let currentPage = 1;
const itemsPerPage = 10;

async function getdata() {
    let response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    let data = await response.json();
    create_table(data, currentPage);
     create_pagination(data)
}

function create_table(data, page = 1) {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginationItems = data.slice(startIndex, endIndex);

    for (let i = 0; i < paginationItems.length; i++) {
        const user = paginationItems[i];
        const row = document.createElement('tr');

        const cellCheckbox = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = user.id;
        checkbox.className = "userCheckbox";
        cellCheckbox.appendChild(checkbox);
        row.appendChild(cellCheckbox);

        const cellName = document.createElement('td');
        cellName.innerText = user.name;
        cellName.className = "userName";
        row.appendChild(cellName);

        const cellEmail = document.createElement('td');
        cellEmail.innerText = user.email;
        cellEmail.className = "userEmail";
        row.appendChild(cellEmail);

        const cellRole = document.createElement('td');
        cellRole.innerText = user.role;
        cellRole.className = "userRole";
        row.appendChild(cellRole);

        const cellAction = document.createElement('td');
        cellAction.innerHTML = `<button title='Edit' class="editicon fa-solid fa-pen-to-square"></button>
        <button title="delete" class="deleteicon fa-solid fa-trash" id="delete-user" onclick="deleteicon(this)"></button>`
        row.appendChild(cellAction);

        tableBody.appendChild(row);
    }
}

// pagination Funtionality

function create_pagination(data) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const pageCount = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        let page = document.createElement('li');
        page.className = "page-Number";
        page.innerText = i;
        paginationDiv.appendChild(page);
    }

    const page = document.querySelectorAll('.page-Number');
    for (let i = 0; i < page.length; i++) {
        page[i].addEventListener('click', function (e) {
            debugger
             currentPage = e.target.innerText;
            for (let j = 0; j < page.length; j++) {
                page[j].classList.remove('active');
            }
            page[i].classList.add('active');
            create_table(data, currentPage);
        });
    }
    if(page.length>0){
        page[0].classList.add('active')
    }

}

// serachFilter Functionality


// delete icon functionality

function deleteicon(button){
    if(confirm('Are you sure you want to delete this record?')){
        const row=button.parentNode.parentNode;
        row.parentNode.appendChild(row);
    }
}
