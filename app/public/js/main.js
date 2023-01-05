document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {});
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
    M.Range.init(document.querySelectorAll("input[type=range]"));
    M.FormSelect.init(document.querySelectorAll('select'), {});
    M.Modal.init(document.querySelectorAll('.modal'), {});
    // document.getElementById('scan_btn').addEventListener('click', async function() {
    //     document.getElementById('scan_btn').classList.add('loading');
    //     fetch('/scan')
    //         .then(data => {
    //             document.getElementById('scan_btn').classList.remove('loading');
    //             window.location.href='/';
    //         })
    //     });
});