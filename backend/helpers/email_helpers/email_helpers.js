
export function createEmailMessage (books) {

    let total_profit = 0;
    let message = "";

    books.forEach(book => {
        total_profit += +book.profit;

        message += message_segment(book);
    })

    let subject = "Potentially $" + total_profit.toFixed(2);

    let template_params = {
        subject : subject,
        message : message
    }

    return template_params
}

function message_segment(book) {
    let imageUrl = "https://pics.ebaystatic.com/aw/pics/nextGenVit/imgNoImg.gif";
    if (book.item.image != undefined && book.item.image.imageUrl != undefined) imageUrl = book.item.image.imageUrl

    return `<a href=${book.url}"><img src=${imageUrl} alt="My Cat"></a><br>
            <a href=${book.url}">${book.title}</a> for $${book.total}<br>
            Market value: $${book.market_value}<br>
            Profit: <b>$${book.profit}</b>
            <br>
            <br>`
}