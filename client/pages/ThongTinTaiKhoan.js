$(document).ready(() => {
    renderCustomerName()
    redirectPage()
})

function redirectPage() {
    const url = new URL(window.location.href)
    if (url.search.includes('thong-tin-ca-nhan')) {
        handleRenderCustomerProfile()
        $('.account-profile__left-item.account').click()
    } else if (url.search.includes('don-hang')) {
        handleRenderCustomerOrder()
        $('.account-profile__left-item.order').click()
    } else if (url.search.includes('dia-chi')) {
        handleRenderThongTinNhanHang()
        $('.account-profile__left-item.address').click()
    }
}

async function renderCustomerName() {
    const loginSession = await getLoginSession()
    const { customerId } = loginSession
    const customer = await getCustomer(customerId)
    $('.account-profile__left-title').text(customer.ten_kh)
}