function getImportInvoiceDetail(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTPhieuNhapController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: importInvoiceDetails => resolve(importInvoiceDetails),
            error: (xhr, status, error) => reject(error)
        })
    })
}