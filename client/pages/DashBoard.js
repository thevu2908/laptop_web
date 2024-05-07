$(document).ready(() => {
    createBarChart()
})

function createBarChart() {
    const chart = document.querySelector('#revenue-chart')
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [
                {
                    label: 'Nhập hàng (triệu đồng)',
                    data: [10, 15, 2, 4, 1, 2, 3, 4, 5, 6, 7, 8],
                    borderWidth: 1,
                    borderColor: '#FFB1C1',
                    backgroundColor: '#FFB1C1'
                },
                {
                    label: 'Doanh thu (triệu đồng)',
                    data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
                    borderWidth: 1,
                    borderColor: '#9AD0F5',
                    backgroundColor: '#9AD0F5'
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}