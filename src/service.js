
import axios from 'axios';

import axiosRetry from 'axios-retry';

export default {

    axios()
    {
        const retry = axios.create();

        axiosRetry(retry, {
            retries: 3,
            retryDelay: (retryCount) => {
                return retryCount * 1000;
            }
        });

        return retry;
    },

    notify(vue, title, text)
    {
        vue.$f7.notification.create({
            icon: '',
            title: title,
            subtitle: text,
            text: '',
            closeButton: true,
        }).open();
    }

}
