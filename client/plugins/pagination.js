function totalPage(count) {
    let total = count
    let totalpages = Math.ceil(parseInt(total) / 8)
    const currentpage = $("#currentpage").val()
    pagination(totalpages, currentpage)
}

function pagination(totalpages, currentpage) {
    var pagelist = ""
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
        var $this = $(this)
        const pagenum = $this.data("page")
        $("#currentpage").val(pagenum)
        func()
        $this.parent().siblings().removeClass("active")
        $this.parent().addClass("active")
    })
}

function enduserTotalPage(total, perPage, currentpage) {
    const totalPages = Math.ceil(total / perPage)
    enduserPagination(totalPages, currentpage)
}

function enduserPagination(totalPages, currentpage) {
    if (totalPages > 1) {
        let disabled = currentpage == 1 ? 'disabled' : ''
        let html = `
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

        $('.product-main .enduser-pagination').html(html)
    }
}

// function enduserClickPage(func) {
//     $(document).on('click', '.enduser-pagination .pagination li a', e => {
//         const $this = $(e.target)
//         console.log($this)
//         const currentPage = $this.data('page')
//         $('#enduser-currentpage').val(currentPage)
//         func()
//         $this.parent().siblings().removeClass("active")
//         $this.parent().addClass("active")
//     })
// }