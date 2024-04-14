function totalPage(count, perPage = 8) {
    let total = count
    let totalpages = Math.ceil(parseInt(total) / perPage)
    const currentpage = $("#currentpage").val()
    pagination(totalpages, currentpage)
}

function pagination(totalpages, currentpage) {
    let pagelist = ""
    if (totalpages > 1) {
        currentpage = parseInt(currentpage)
        pagelist += `<ul class="pagination justify-content-center">`
        const prevClass = currentpage == 1 ? " disabled" : ""
        pagelist += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${currentpage - 1}">Previous</a></li>`
        for (let p = 1; p <= totalpages; p++) {
            const activeClass = currentpage == p ? " active" : ""
            pagelist += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`
        }
        const nextClass = currentpage == totalpages ? " disabled" : ""
        pagelist += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${currentpage + 1}">Next</a></li>`
        pagelist += `</ul>`
    }
    $("#pagination").html(pagelist)
}

function clickPage(func) {
    $(document).on("click", "ul.pagination li a", function(e) {
        e.preventDefault()
        const $this = $(this)
        const pagenum = $this.data("page")
        $("#currentpage").val(pagenum)
        func()
        $this.parent().siblings().removeClass("active")
        $this.parent().addClass("active")
        $(window).scrollTop(0)
    })
}

function enduserTotalPage(total, perPage, currentpage) {
    const totalPages = Math.ceil(total / perPage)
    enduserPagination(totalPages, currentpage)
}

function enduserPagination(totalPages, currentpage) {
    let html = ''
    if (totalPages > 1) {
        let disabled = currentpage == 1 ? 'disabled' : ''
        html = `
            <ul class="pagination">
                <li class="page-item ${disabled}"><a class="page-link btn-prev" data-page=${Number(currentpage) - 1} aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
        `

        for (let i = 1; i <= totalPages; i++) {
            const active = i == currentpage ? 'active' : '';
            html += `<li class="page-item ${active}"><a class="page-link" data-page=${i}>${i}</a></li>`
        }

        disabled = currentpage == totalPages ? 'disabled' : ''
        html += `
                <li class="page-item ${disabled}"><a class="page-link btn-next" data-page=${Number(currentpage) + 1} aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
            </ul>
        `
    }
    $('.enduser-pagination').html(html)
}