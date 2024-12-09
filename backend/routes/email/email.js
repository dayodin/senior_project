import axios from "axios";

export async function sendEmail (book) {

    let template_params = {
        title : book.title,
        price : book.total,
        message : "PROFIT: $" + book.profit,
        link : book.url    
    }

    await axios.post('https://api.emailjs.com/api/v1.0/email/send', 
        {
            service_id: 'service_xgxsdjs',
            template_id: 'template_j24z5ld',
            user_id: 'y_PhK6gh8d6SY9-P8',
            template_params: template_params
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            () => { console.log('SUCCESS!'); },
            (error) => { console.log('FAILED...', error); },
        );
}