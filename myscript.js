let currentPage = 1;
const itemsPerPage = 10;

async function getdata() {
    let response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    let data = await response.json();
    create_table(data, currentPage);
    create_pagination(data);
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
        cellAction.innerHTML = `<button title='Edit' class="editicon fa-solid fa-pen-to-square" onclick="openEditModal(this)"></button>
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
            currentPage = e.target.innerText;
            for (let j = 0; j < page.length; j++) {
                page[j].classList.remove('active');
            }
            page[i].classList.add('active');
            create_table(data, currentPage);
        });
    }
    if (page.length > 0) {
        page[0].classList.add('active')
    }

}

// serachFilter Functionality

function serachFilter() {
    var input, filter, table, td, tr, txtvalue;
    var displayRow = [];
    var hideRow = [];
    input = document.getElementById('searchInput')
    table = document.getElementById('dataTable');
    filter = input.value.toUpperCase();
    tr = table.getElementsByTagName('tr');

    var clearButton = document.getElementById("clear-button");
    clearButton.style.display = input.value ? "inline-block" : "none";

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td');
        if (td && td.length >= 4) {
            var name = td[1].textcontent || td[1].innerText;
            var email = td[2].textcontent || td[2].innerText;
            var role = td[3].textcontent || td[3].innerText;

            txtvalue = name + " " + email + " " + role;

            if (txtvalue.toUpperCase().indexOf(filter) > -1) {
                displayRow.push(tr[i].id);
                tr[i].style.display = "table-row";
            } else {
                hideRow.push(tr[i].id);
                tr[i].style.display = "none";
            }
        }
    }

    return { displayRow: displayRow, hideRow: hideRow }
}

// clear search

function clearSearch() {
    let input = document.getElementById("searchInput");
    let table = document.getElementById("dataTable");
    let tr = table.getElementsByTagName("tr");
    let clearButton = document.getElementById("clear-button");

    input.value = "";
    clearButton.style.display = "none";

    for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
    input.focus();
}

// function serachFilter() {
//     var input, filter, table, tr, userName, userEmail, userRole;
//     var elementCount = 0;
//     var nameValue, emailValue, roleValue;
//     const displayRow = [];
//     const hideRow = [];
//     input = document.getElementById('searchInput');
//     filter = input.value;
//     table = document.getElementById('dataTable');
//     tr = table.getElementsByTagName('tr');
//     for (let i = 0; i < tr.length; i++) {
//         userName = tr[i].getElementsByTagName('td')[0];
//         userEmail = tr[i].getElementsByTagName('td')[1];
//         userRole = tr[i].getElementsByTagName('td')[2];
//         if (userName || userEmail || userRole) {
//             nameValue = userName.innerText || userName.textContent;
//             emailValue = userEmail.innerText || userEmail.textContent;
//             roleValue = userRole.innerText || userRole.textContent;

//             if (nameValue.indexOf(filter) > -1 || emailValue.indexOf(filter) > -1 || roleValue.indexOf(filter) > -1) {
//                 displayRow.push(tr[i].id);
//                 elementCount += 1;
//                 create_pagination(elementCount);
//                 if (displayRow.length <= 10) {
//                     tr[i].style.display = "table-row";
//                 } else {
//                     tr[i].style.display = "none";
//                 }
//             } else {
//                 hideRow.push(tr[i].id);
//                 tr[i].style.display = "none";
//             }
//         }
//     }
//     return { displayRow: displayRow, hideRow: hideRow};
// }

// function create_pagination(elementCount) {
//     table = document.getElementById('dataTable');
//     tr = table.getElementsByTagName('tr');
//     elementCount = Math.ceil(elementCount / 10) || Math.ceil(tr.length / 10);
//     document.getElementById('pagination').innerHTML = '';
//     for (let i = 1; i <= elementCount; i++) {
//         let page = document.createElement('button');
//         page.innerText = i;
//         page.id = `pageCount${i}`;
//         let space = document.createElement('span');
//         document.getElementById('pagination').append(page, space);
//     }
// }



// delete icon functionality

function deleteicon(button) {
    if (confirm('Are you sure you want to delete this record?')) {
        const row = button.parentNode.parentNode;
        row.parentNode.appendChild(row);
    }
}

// select All checkbox functionality

function selectAllcheckbox() {
    let selectAll = document.getElementById('selectAll');
    let checkbox = document.querySelectorAll('.userCheckbox');
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = selectAll.checked;
    }
}


// select All selected delete button Functionality

function selectAllselected() {
    if (confirm('Are you sure you want to delete this record?')) {
        let table = document.getElementById('dataTable');
        let checkboxs = table.querySelectorAll('.userCheckbox:checked');
        for (let i = checkboxs.length - 1; i >= 0; i--) {
            let row = checkboxs[i].parentElement.parentElement;
            row.parentElement.removeChild(row);
        }
    }
}

// Edit model functionality
function openEditModal(button) {
    debugger
    let row = button.parentNode.parentNode;

    let nameCell = row.querySelector('.userName').textContent;
    let emailCell = row.querySelector('.userEmail').textContent;
    let roleCell = row.querySelector('.userRole').textContent;

    document.getElementById('userName').value = nameCell;
    document.getElementById('userEmail').value = emailCell;
    document.getElementById('userRole').value = roleCell;

    document.getElementById('editForm').setAttribute('data-row', row.rowIndex);

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
}

document.getElementById('editForm').onsubmit = function(event) {
    event.preventDefault();

    // Get the modified data from the form
    let newName = document.getElementById('userName').value;
    let newEmail = document.getElementById('userEmail').value;
    let newRole = document.getElementById('userRole').value;

    // Retrieve the row index stored earlier
    let rowIndex = parseInt(document.getElementById('editForm').getAttribute('data-row'));
    console.log(rowIndex);
    let row = document.querySelector('table').rows[rowIndex];
    console.log(row);

    // Update the table cell values with the modified data
    row.querySelector('.userName').textContent = newName;
    row.querySelector('.userEmail').textContent = newEmail;
    row.querySelector('.userRole').textContent = newRole;

    // Add code to handle form submission and save the data
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

const span = document.getElementById('close');
span.onclick = function () {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};


