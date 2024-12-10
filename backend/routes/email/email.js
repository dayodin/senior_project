import axios from "axios";
import { createEmailMessage } from "../../helpers/email_helpers/email_helpers.js";

export async function sendEmail (book) {

    const template_params = createEmailMessage(book);

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