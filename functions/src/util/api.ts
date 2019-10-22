import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.apigw.smt.docomo.ne.jp/truetext/v1/sensitivecheck?APIKEY=2e5966414f51487a6d6d58685456436e6f7656715168342e6b2e72554361314e6f4f6e4339413334616644',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});